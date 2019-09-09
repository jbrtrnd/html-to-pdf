/**
 * Scroller.
 */
export class Scroller {
    // Scroller HTML element
    element: HTMLElement;
    // Top scroll
    top: number = 0;
    // Left scroll
    left: number = 0;

    /**
     *
     * @param content
     */
    constructor(content: string) {
        this.element = this.createElement();
        this.element.innerHTML = content;
    }

    /**
     * Create Scroller HTML element.
     */
    private createElement(): HTMLElement {
        const element = document.createElement('div');
        element.setAttribute('id', 'html2pdf-scroller');
        element.setAttribute('style', 'width:99999999%; position: relative;');

        return element;
    }

    /**
     * Move scroller scroll position.
     *
     * @param top
     * @param left
     */
    applyScroll(top: number, left: number): void {
        this.top = top;
        this.left = left;

        this.element.style.top = this.top + 'px';
        this.element.style.left = this.left + 'px';
    }
}
