import * as html2canvas from 'html2canvas';
import { Page }         from './Page';
import { Scroller }     from './Scroller';

/**
 * Container.
 */
export class Container {
    // Container HTML element
    element: HTMLElement;
    // Scroller
    scroller: Scroller;
    // Container height
    height: number = 0;
    // Container width
    width: number = 0;

    /**
     *
     * @param content
     * @param height
     * @param width
     */
    constructor(content: string, height: number, width: number) {
        this.height = height;
        this.width = width;

        this.element = this.createElement();
        this.scroller = new Scroller(content);

        this.element.appendChild(this.scroller.element);
        document.body.append(this.element);
    }

    /**
     * Create Scroller HTML element.
     */
    private createElement(): HTMLElement {
        const element = document.createElement('div');
        element.setAttribute('id', 'html2pdf-container');
        element.setAttribute('style', 'position:relative; z-index:99999; overflow: hidden;');

        element.style.width = this.width + 'px';
        element.style.height = this.height + 'px';

        return element;
    }

    /**
     * Apply page.
     *
     * @param page
     */
    setPage(page: Page): void {
        this.scroller.applyScroll(page.top, page.left);
    }

    /**
     * Convert container to canvas.
     */
    toCanvas(): Promise<HTMLCanvasElement> {
        return html2canvas(this.element, {
            width: this.width,
            height: this.height,
        });
    }

    clear() {
        document.body.removeChild(this.element);
    }
}
