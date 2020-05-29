<template>
  <div class="container-fluid">
    <p class="text-center display-3 mb-5">{{title}}</p>
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
        <tr v-for="fresher in fresherList" v-bind:key="fresher.fresherId">
          <th scope="row">{{fresher.fresherId}}</th>
          <td>{{fresher.fresherCode}}</td>
          <td>{{fresher.firstName}}</td>
          <td>{{fresher.lastName}}</td>
          <td>{{fresher.fullName}}</td>
          <td>
            <button type="button" class="btn btn-danger">Edit</button>
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
      }
    }
  },
  methods: {
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
    deleteFresher: async function(id){
      await axios.delete('https://localhost:44309/api/Freshers/'+id)
                 .then(response => {
                   console.log('success');
                 })
                 .catch(err => {
                   console.log(err);
                   
                 })
    },
    createFresher: async function(){
      await axios.post('https://localhost:44309/api/Freshers/',{
        fresherId: this.fresher.fresherId,
        fresherCode: this.fresher.fresherCode,
        firstName : this.fresher.firstName,
        lastName: this.fresher.lastName,
        fullName: this.fresher.fullName
      })
    }
  },
  created() {
    this.getFesherList()
  },
  updated(){
    this.getFesherList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
