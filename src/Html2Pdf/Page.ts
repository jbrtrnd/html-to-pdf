import { Container }    from './Container';

/**
 * Page.
 */
export class Page {
    // Page top position
    top: number = 0;
    // Page left position
    left: number = 0;

    /**
     *
     * @param top
     * @param left
     */
    constructor(top: number, left: number) {
        this.top = top;
        this.left = left;
    }

    /**
     * Apply the page to a container and convert it to canvas.
     *
     * @param container
     */
    toCanvas(container: Container): Promise<HTMLCanvasElement> {
        container.setPage(this);
        return container.toCanvas();
    }
}
