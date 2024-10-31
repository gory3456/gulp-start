export default class Modal {
    static modals = [];

    constructor(modalElement, activeClass) {
        this.modalEl = modalElement;
        this.activeClass = activeClass;

        Modal.modals.push(this);
    }

    openModal() {
        this.modalEl?.classList.add(this.activeClass);
    }

    closeModal() {
        this.modalEl?.classList.remove(this.activeClass);
    }

    static closeAllModal() {
        Modal.modals.forEach(modal => modal.closeModal());
    }
}