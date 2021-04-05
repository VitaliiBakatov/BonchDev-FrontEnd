<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <table>
              <tr><span>Название: </span></tr>
              <tr>
                <input type="text" v-model="titleModal">
              </tr>
              <br>
              <tr><span>Описание: </span></tr>
              <tr>
                <input type="text" v-model="descriptionModal">
              </tr>
              <br>
              <tr><span>Дата: </span></tr>
              <tr>
                <input type="date" v-model="dateModal">
              </tr>
              <br>
              <tr><span>Сумма: </span></tr>
              <tr>
                <input type="number" v-model.number="amountModal">
              </tr>
              <br>
            </table>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close', [titleModal, descriptionModal, dateModal, amountModal])">
              Добавить
            </button>
            <br>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['title', 'description', 'date', 'amount'],
  data () {
    return {
      titleModal: this.title,
      descriptionModal: this.description,
      dateModal: this.date,
      amountModal: this.amount
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}

table {
  margin: auto;
  margin-bottom: 15px;
}

.modal-default-button {
  float: contour;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
