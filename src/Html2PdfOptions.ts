/**
 * Exporter options.
 */
export class Html2PdfOptions {
    // Ratio of 1cm in pixel
    pixelRatio: number;
    // Dimensions of a page
    dimensions: { height: number, width: number } | 'A4' = 'A4';

    /**
     *
     * @param options
     */
    constructor(options: any) {
        Object.assign(this, options);

        this.pixelRatio = this.getPixelRatio();

        switch (this.dimensions) {
            case 'A4':
                this.dimensions = {
                    height: 29.7 * this.pixelRatio,
                    width: 21 * this.pixelRatio
                };
                break;
        }
    }

    private getPixelRatio(): number {
        const ratioElement = document.createElement('div');
        ratioElement.style.width = '1cm';

        document.body.appendChild(ratioElement);

        const ratio = ratioElement.clientWidth;

        document.body.removeChild(ratioElement);

        return ratio;
    }
}
