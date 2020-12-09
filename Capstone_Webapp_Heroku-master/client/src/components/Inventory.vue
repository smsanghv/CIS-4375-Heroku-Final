<template>
<!-- Complete SPA CRUD for inventory in database -->
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="inventory">
    <div class="row">
      <div class="col-sm-10">
        <h2 class="w3-center">Inventory</h2>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.Inventory-modal>Set Up New Inventory</button>
        <button type="button" class="btn btn-primary btn-sm" style="margin:5px;" @click="downloadPDF">Download PDF</button>
        <br><br>
        <input class="form-control" id="invSearch" type="text" placeholder="Search">
        <table id="thisInvTable" class="table table-hover">
          <thead>
            <tr>
              <th scope="col" @click="sort('itemname')">Item Name</th>
              <th scope="col" @click="sort('numberleft')">Number Left</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="invTable">
            <tr v-for="Inventory in sortedInventories" :key="Inventory._id">
              <td>{{ Inventory.itemname }}</td>
              <td>{{ Inventory.numberleft }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.Inventory-update-modal
                          @click="editInventory(Inventory)">
                      Edit
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteInventory(Inventory)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <button type="button" class="btn btn-info btn-sm" @click="prevPage">Previous</button> 
          <button type="button" class="btn btn-info btn-sm" style="margin:5px;" @click="nextPage">Next</button>
        </p>
      </div>
    </div>
    <b-modal ref="addInventoryModal"
            id="Inventory-modal"
            title="Create a new inventory item"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-itemname-group"
                    label="Item Name:"
                    label-for="form-itemname-input">
          <b-form-input id="form-itemname-input"
                        type="text"
                        v-model="addInventoryForm.itemname"
                        required
                        placeholder="Enter item name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-numberleft-group"
                    label="Number Left:"
                    label-for="form-numberleft-input">
          <b-form-input id="form-numberleft-input"
                        type="number"
                        v-model="addInventoryForm.numberleft"
                        required
                        placeholder="Enter number left">
          </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editInventoryModal"
            id="Inventory-update-modal"
            title="Edit Exxon Inventory"
            hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
      <b-form-group id="form-itemname-edit-group"
                    label="Item Name:"
                    label-for="form-itemname-edit-input">
          <b-form-input id="form-itemname-edit-input"
                        type="text"
                        v-model="editForm.itemname"
                        required
                        placeholder="Enter item name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-numberleft-edit-group"
                    label="Number Left:"
                    label-for="form-numberleft-edit-input">
          <b-form-input id="form-numberleft-edit-input"
                        type="number"
                        v-model="editForm.numberleft"
                        required
                        placeholder="Enter number left">
          </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
import $ from 'jquery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

$(document).ready(function(){
  $("#invSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#invTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

export default {
  data() {
    return {
      Inventories: [],
      addInventoryForm: {
        itemname: '',
        numberleft: '',
      },
      message: '',
      showMessage: false,
      editForm: {
        _id: '',
        itemname: '',
        numberleft: '',
      },
      currentSort:'itemname',
      currentSortDir:'asc',
      pageSize:10,
      currentPage:1,
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getInventories() {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/inventory/getallinv';
      axios.get(path)
        .then((res) => {
          this.Inventories = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addInventory(payload) {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/inventory/additem';
      axios.post(path, payload)
        .then(() => {
          this.getInventories();
          this.message = 'Inventory created!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getInventories();
        });
    },
    initForm() {
      this.addInventoryForm.itemname = '';
      this.addInventoryForm.numberleft = '';
      this.editForm._id = '';
      this.editForm.itemname = '';
      this.editForm.numberleft = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addInventoryModal.hide();
      //let read = false;
      //if (this.addInventoryForm.read[0]) read = true;
      const payload = {
        itemname: this.addInventoryForm.itemname,
        numberleft: this.addInventoryForm.numberleft,
      };
      this.addInventory(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addInventoryModal.hide();
      this.initForm();
    },
    editInventory(Inventory) {
      this.editForm = Inventory;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editInventoryModal.hide();
      //let read = false;
      //if (this.editForm.read[0]) read = true;
      const payload = {
        itemname: this.editForm.itemname,
        numberleft: this.editForm.numberleft,
      };
      this.updateInventory(payload, this.editForm._id);
    },
    updateInventory(payload, InventoryID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/inventory/updateitem/${InventoryID}`;
      axios.put(path, payload)
        .then(() => {
          this.getInventories();
          this.message = 'Inventory updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getInventories();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editInventoryModal.hide();
      this.initForm();
      this.getInventories();
    },
    removeInventory(InventoryID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/inventory/deleteitem/${InventoryID}`;
      axios.delete(path)
        .then(() => {
          this.getInventories();
          this.message = 'Inventory deleted!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getInventories();
        });
    },
    onDeleteInventory(Inventory) {
      this.removeInventory(Inventory._id);
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.Inventories.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    downloadPDF() {
      const doc = new jsPDF()
      autoTable(doc, { html: '#thisInvTable', theme: 'grid' })
      doc.save('inventory_table.pdf')
    }
  },
  created() {
    this.getInventories();
  },
  computed: {
    /*sortedInventories: function() {
      function compare(a, b) {
        if (a.itemname < b.itemname)
          return -1;
        if (a.itemname > b.itemname)
          return 1;
        return 0;
      }

      return this.Inventories.slice(0).sort(compare);
    }*/
    sortedInventories:function() {
      return this.Inventories.slice(0).sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  },
};
</script>

<style>
  th {
    cursor: pointer;
  }
</style>