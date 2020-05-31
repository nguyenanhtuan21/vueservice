<template>
  <div class="container-fluid">
    <p class="text-center display-3 mb-5">{{title}}</p>
    <div class="form-submit d-none">
        <form class="row mb-5">
            <div class="form-group col-6">
                <label>Fresher ID</label>
                <input type="text" class="form-control" placeholder="Fresher ID" v-model="fresherEdit.fresherId" disabled>
            </div>
            <div class="form-group col-6">
                <label>Fresher Code</label>
                <input type="text" class="form-control" placeholder="Fresher Code" v-model="fresherEdit.fresherCode">
            </div>
            <div class="form-group col-6">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name" v-model="fresherEdit.firstName">
            </div>
            <div class="form-group col-6">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" v-model="fresherEdit.lastName">
            </div>
            <div class="form-group col-6">
                <label>Full Name</label>
                <input type="text" class="form-control" placeholder="Full Name" v-model="fresherEdit.fullName">
            </div>
            <div class="form-group col-12 text-center">
              <button class="btn btn-primary btn-sm ml-2 mr-2 pl-5 pr-5 pt-2 pb-2" v-on:click="onSaveAfterEdit(fresherEdit.fresherId)">Save</button>
              <button class="btn btn-danger btn-sm ml-2 mr-2 pl-5 pr-5 pt-2 pb-2" v-on:click="toggleForm()">Close</button>
            </div>
        </form>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">FresherID</th>
          <th scope="col">FresherCode</th>
          <th scope="col">FirstName</th>
          <th scope="col">LastName</th>
          <th scope="col">FullName</th>
          <th scope="col">Actions</th>
        </tr>
        <tr>
          <th scope="col"><input type="text" class="form-control" v-model="fresher.fresherId"></th>
          <th scope="col"><input type="text" class="form-control" v-model="fresher.fresherCode"></th>
          <th scope="col"><input type="text" class="form-control" v-model="fresher.firstName"></th>
          <th scope="col"><input type="text" class="form-control" v-model="fresher.lastName"></th>
          <th scope="col"><input type="text" class="form-control" v-model="fresher.fullName"></th>
          <th scope="col"><button type="button" class="btn btn-primary" v-on:click="createFresher" >Add</button></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fresher,index) in fresherList" v-bind:key="fresher.fresherId">
          <th scope="row">{{fresher.fresherId}}</th>
          <td>{{fresher.fresherCode}}</td>
          <td>{{fresher.firstName}}</td>
          <td>{{fresher.lastName}}</td>
          <td>{{fresher.fullName}}</td>
          <td>
            <button type="button" class="btn btn-danger" v-on:click="editFresher(index)">Edit</button>
            <button type="button" class="btn btn-warning" v-on:click="deleteFresher(fresher.fresherId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'MainPage',
  /**
   * @author Tuan Nguyen
   * @property title - title of the page
   * @property fresherList - list of fresher you need return
   * @property fresher - Used for create a new fresher 
   */
  data () {
    return {
      title: 'Danh sách fresher',
      fresherList: [],
      fresher: {
        fresherId: '',
        fresherCode:'',
        firstName:'',
        lastName:'',
        fullName:''
      },
      fresherEdit:{
        fresherId: '',
        fresherCode:'',
        firstName:'',
        lastName:'',
        fullName:''
      }
    }
  },
  methods: {
    /**
     * @author Tuan Nguyen
     * @description Get list of fresher 
     */
    getFesherList:async function(){
      await axios.get('https://localhost:44309/api/Freshers')
                 .then(response => {
                   this.fresherList = response.data
                   //console.log(this.fresherList)
                 })
                 .catch(err =>{
                   console.log(err);
                 })
    },
    /**
     * @author Tuan Nguyen
     * @param id - id of fresher you want to delete
     * @description Get list of fresher 
     */
    deleteFresher: async function(id){
      await axios.delete('https://localhost:44309/api/Freshers/'+id)
                 .then(response => {
                   console.log('success');
                   alert('xóa thành côngcông')
                 })
                 .catch(err => {
                   console.log(err);
                   alert('xóa thất bại')
                   
                 })

                 this.reloadFresherList()
    },
    /**
     * @author Tuan Nguyen
     * @description Create a new fresher
     */
    createFresher: async function(){

      await axios.post('https://localhost:44309/api/Freshers/',{
        fresherId: this.fresher.fresherId,
        fresherCode: this.fresher.fresherCode,
        firstName : this.fresher.firstName,
        lastName: this.fresher.lastName,
        fullName: this.fresher.fullName
      }).then(response => {
        alert('Thêm thành công !')
      }).catch(err => {
        alert("Thêm fresher thất bại")
      })

      this.reloadFresherList()
    },
    /**
     * @author Tuan Nguyen
     * @description Reload the list of fresher
     */
    reloadFresherList: function(){
      this.getFesherList()
    },
    /**
     * @author Tuan Nguyen
     * @param index : index of this fresher 
     * @description Edit a fresher by index
     */
    editFresher: function(index){
      let fre = this.fresherList[index]
      this.fresherEdit.fresherId = fre.fresherId
      this.fresherEdit.fresherCode = fre.fresherCode
      this.fresherEdit.firstName = fre.firstName
      this.fresherEdit.lastName = fre.lastName
      this.fresherEdit.fullName = fre.fullName

      this.toggleForm()

    },
    /**
     * @author Tuan Nguyen 
     * @description Toggle form show/hide
     */
     toggleForm: function(){
       var forms = document.querySelector('.form-submit')
       forms.classList.toggle('d-show')
     },
     /**
     * @author Tuan Nguyen 
     * @description catch event save the change edit
     */
     onSaveAfterEdit: async function(id){
       await axios.put('https://localhost:44309/api/Freshers/'+id, {
         fresherId: this.fresherEdit.fresherId,
        fresherCode: this.fresherEdit.fresherCode,
        firstName : this.fresherEdit.firstName,
        lastName: this.fresherEdit.lastName,
        fullName: this.fresherEdit.fullName
       }).then(response => {
         alert('sửa thành công')
         this.reloadFresherList()
         this.toggleForm()
       }).catch(err => {
         alert('sửa thất bại')
         this.reloadFresherList()
       })
     }
  },
  created() {
    this.getFesherList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .d-show{
    display: block !important;
  }
</style>

