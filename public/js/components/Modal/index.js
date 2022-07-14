import { createCustomEvent } from "../../lib/customEvent";
import Component from "../component";
import "./style.css";

export default class Modal extends Component {
  $todo;
  constructor($parent, $state, $props) {
    super($parent, "div", { id: "modal" });

    this.render();
  }

  setEvent() {
    createCustomEvent(
      "openModalAndSetTodo",
      this.$element,
      this.openModalAndSetTodo.bind(this)
    );

    this.addEvent("click", "#modal", (e) => {
      const $card = e.target.closest(".delete-card");

      if ($card) this.onClickButton(e);
      else this.toggleModal();
    });
  }

  openModalAndSetTodo(e) {
    this.toggleModal();
    this.$todo = e.detail.todo;
  }

  toggleModal() {
    this.$element.classList.toggle("open");
  }

  onClickButton(e) {
    const $button = e.target.closest(".button");

    if (!$button) return;

    if ($button.classList.contains("close")) this.toggleModal();
    else if ($button.classList.contains("delete")) {
      console.log(this.$todo);
      // api
      this.toggleModal();
    }
  }

  mount() {
    this.$element.innerHTML = `
       <div class="delete-card">
          <p>선택한 카드를 삭제할까요?</p>
          <div class="delete-card-button-list">
            <button class="button close">취소</button>
            <button class="button primary delete">삭제</button>
          </div>
        </div>
    `;
  }
}