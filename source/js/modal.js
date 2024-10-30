export default class {
    constructor(modalElement, activeClass) {
        this.modalEl = modalElement;
        this.activeClass = activeClass;
    }

    openModal() {
        this.modalEl?.classList.add(this.activeClass);
    }

    closeModal() {
        this.modalEl?.classList.remove(this.activeClass);
    }
}