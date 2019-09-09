import { Container }       from './Html2Pdf/Container';
import { Page }            from './Html2Pdf/Page';
import { Html2PdfOptions } from './Html2PdfOptions';
import * as jsPDF from 'jspdf';

/**
 * Exporter.
 */
export class Html2Pdf {
    // HTML element to export
    private element: HTMLElement;
    // Export options
    private options: Html2PdfOptions;
    // Page needed for export
    private pages: Page[] = [];
    // Current export container
    private container: Container;

    /**
     *
     * @param selector
     * @param options
     */
    constructor(selector: HTMLElement | string, options: Html2PdfOptions | any = {}) {
        // Retrieve element
        this.element = this.getElement(selector);

        // Options initialization
        if (!(options instanceof Html2PdfOptions)) {
            options = new Html2PdfOptions(options);
        }
        this.options = options;

        // Get pages
        this.retrievePages();
    }

    /**
     * Throw a custom error.
     *
     * @param message
     */
    private throw(message: string) {
        throw new Error('[html2pdf] ' + message);
    }

    /**
     * Retrieve HTML element from selector.
     *
     * @param selector
     */
    private getElement(selector: HTMLElement | string): HTMLElement {
        if (selector instanceof HTMLElement) {
            return selector;
        }

        const element = document.querySelector(selector);

        if (element === null) {
            this.throw('element can\'t be found')
        }

        return element as HTMLElement;
    }

    /**
     * Retrieves pages from options and element.
     */
    private retrievePages(): void {
        const elementHeight = +this.element.clientHeight;
        const elementWidth = +this.element.clientWidth;

        const pageHeight = this.options.dimensions.height;
        const pageWidth = this.options.dimensions.width;

        // Number of vertical pages
        const vertical = Math.ceil(elementHeight / pageHeight);
        // Number of horizontal pages
        const horizontal = Math.ceil(elementWidth / pageWidth);

        for (let y = 0; y < vertical; y++) {
            const top = (y * pageHeight) * -1;
            for (let x = 0; x < horizontal; x++) {
                const left = (x * pageWidth) * -1;

                this.pages.push(new Page(top, left));
            }
        }
    }

    /**
     * Create exporter elements in DOM.
     */
    private createExporterDOM(): void {
        const pageHeight = this.options.dimensions.height;
        const pageWidth = this.options.dimensions.width;

        this.container = new Container(this.element.outerHTML, pageHeight, pageWidth);
    }

    /**
     * Remove exporter elements.
     */
    private removeExporterDOM(): void {
        this.container.clear();
        this.container = null;
    }

    /**
     * Convert each page to a canvas.
     */
    private async pagesToCanvases(): Promise<HTMLCanvasElement[]> {
        this.createExporterDOM();

        const canvases = [];
        for (let i = 0; i < this.pages.length; i++) {
            const canvas = await this.pages[i].toCanvas(this.container);
            canvases.push(canvas);
        }

        this.removeExporterDOM();

        return canvases;
    }

    /**
     * Element to PNG pages.
     */
    async toPNG(): Promise<HTMLImageElement[]> {
        const canvases = await this.pagesToCanvases();

        return canvases.map(canvas => {
            const image = new Image();
            image.src = canvas.toDataURL('image/png', 1.0);
            image.width = canvas.width;
            image.height = canvas.height;
            return image;
        });
    }

    /**
     * Element to JPEG pages.
     */
    async toJPEG(): Promise<HTMLImageElement[]> {
        const canvases = await this.pagesToCanvases();

        return canvases.map(canvas => {
            const image = new Image();
            image.src = canvas.toDataURL('image/jpeg', 1.0);
            image.width = canvas.width;
            image.height = canvas.height;
            return image;
        });
    }

    /**
     * Element to Canvas elements.
     */
    async toCanvas(): Promise<HTMLCanvasElement[]> {
        return this.pagesToCanvases();
    }

    /**
     * Element to PDF pages.
     */
    async toPDF() {
        const canvases = await this.pagesToCanvases();
        const pdf = new jsPDF();

        for (let i = 0; i < canvases.length; i++) {
            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(canvases[i], 'JPEG', 0, 0);
        }

        pdf.save();
    }
}


