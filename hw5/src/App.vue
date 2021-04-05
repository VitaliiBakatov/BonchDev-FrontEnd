<template>
  <div id="app">
    <div id="balance">
      <span>Ваш итоговый баланс: </span>
      <span :class="{redAmount: isRed, greenAmount: isGreen}">{{ result }}₽</span>
    </div>
    <div id="income">
      <h4>Доходы:</h4>
      <div class="item" v-for="(item,index) in itemsIncome" :key="index">
        <div class="info">
          <p>№{{ index + 1 }}</p>
          <p>Название: {{ item.title }}</p>
          <p>Описание: {{ item.description }}</p>
          <p>Дата: {{ item.date }}</p>
          <p> Сумма: <span class="greenAmount">{{ item.amount + '₽  ' }}</span></p>
        </div>
        <div class="btn">
          <button @click="showIncomeEditModal = true">Редактировать</button>
          <modal v-if="showIncomeEditModal" @close="editIncome(item, $event)" :title="item.title" :description="item.description" :date="item.date" :amount="item.amount">
            <h3 slot="header">Редактирование доходов</h3>
          </modal>
          <button v-on:click="itemsIncome.splice(index, 1)">Удалить</button>
        </div>
      </div>
      <button class="btn_addItem" @click="showIncomeCreateModal = true">Добавить доходы</button>
      <modal v-if="showIncomeCreateModal" @close="addIncome">
        <h3 slot="header">Добавление доходов</h3>
      </modal>
    </div>
    <div id="costs">
      <h4>Расходы:</h4>
      <div class="item" v-for="(item,index) in itemsCosts" :key="index">
        <div class="info">
          <p>№{{ index + 1 }}</p>
          <p>Название: {{ item.title }}</p>
          <p>Описание: {{ item.description }}</p>
          <p>Дата: {{ item.date }}</p>
          <p> Сумма: <span class="redAmount">{{ item.amount + '₽  ' }}</span></p>
        </div>
        <div class="btn">
          <button @click="showCostsEditModal = true">Редактировать</button>
          <modal v-if="showCostsEditModal" @close="editCost(item, $event)" :title="item.title" :description="item.description" :date="item.date" :amount="item.amount">
            <h3 slot="header">Редактирование расходов</h3>
          </modal>
          <button v-on:click="itemsCosts.splice(index, 1)">Удалить</button>
        </div>
      </div>
      <button class="btn_addItem" @click="showCostsCreateModal = true">Добавить расходы</button>
      <modal v-if="showCostsCreateModal" @close="addCost">
        <h3 slot="header">Добавление расходов</h3>
      </modal>
    </div>
  </div>
</template>

<script>
import modal from './components/modal'

export default {
  name: 'page',
  components: {
    modal
  },
  data () {
    return {
      itemsIncome: [],
      itemsCosts: [],
      showCostsCreateModal: false,
      showIncomeCreateModal: false,
      showCostsEditModal: false,
      showIncomeEditModal: false
    }
  },
  computed: {
    result: function () {
      let result1 = 0
      this.itemsIncome.forEach(function (item) {
        result1 += item.amount
      })
      this.itemsCosts.forEach(function (item) {
        result1 -= item.amount
      })
      return result1
    },
    // eslint-disable-next-line vue/return-in-computed-property
    isGreen: function () {
      if (this.result > 0) {
        return true
      } else if (this.result <= 0) {
        return false
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    isRed: function () {
      if (this.result < 0) {
        return true
      } else if (this.result >= 0) {
        return false
      }
    }
  },
  methods: {
    addCost (args) {
      if (!args[0].isEmpty && !args[1].isEmpty && !args[2].isEmpty && !args[3].isEmpty) {
        this.itemsCosts.push(
          {
            title: args[0],
            description: args[1],
            date: args[2],
            amount: args[3]
          }
        )
        this.showCostsCreateModal = false
      }
    },
    addIncome (args) {
      if (!args[0].isEmpty && !args[1].isEmpty && !args[2].isEmpty && !args[3].isEmpty) {
        this.itemsIncome.push(
          {
            title: args[0],
            description: args[1],
            date: args[2],
            amount: args[3]
          }
        )
        this.showIncomeCreateModal = false
      }
    },
    editIncome (item, args) {
      if (args[0] !== '' && args[1] !== '' && args[2] !== '' && args[3] !== '') {
        item.title = args[0]
        item.description = args[1]
        item.date = args[2]
        item.amount = args[3]
        this.showIncomeEditModal = false
      }
    },
    editCost (item, args) {
      if (args[0] !== '' && args[1] !== '' && args[2] !== '' && args[3] !== '') {
        item.title = args[0]
        item.description = args[1]
        item.date = args[2]
        item.amount = args[3]
        this.showCostsEditModal = false
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  font-size: 20px;
}

#balance {
  margin: 36px;
}

#budget {
  margin-right: 10%;
}

#income {
  display: inline-block;
  left: 10%;
  align-items: center;
}

#costs {
  display: inline-block;
  right: 10%;
}

.item {
  max-width: 450px;
  word-break: break-all;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  padding: 10px;
  text-align: center;
}

.item:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.info {
  text-align: left;
}

button {
  color: gray;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid;
  border-radius: 1px;
  margin-right: 5px;
}

.btn {
  align-items: center;
}

.btn_addItem {
  margin: 5%;
  padding: .5em 2em;
}

button:hover {
  background-color: darkgray;
}

.redAmount {
  color: #CC0605;
}

.greenAmount {
  color: #42b983;
}
</style>
