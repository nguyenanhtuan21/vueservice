<template>
    <div class="form-submit">
        <form>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Fresher ID" v-model="fresher.fresherId">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Fresher Code" v-model="fresher.fresherCode">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="First Name" v-model="fresher.firstName">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Last Name" v-model="fresher.lastName">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Full Name" v-model="fresher.fullName">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Popup',
    data(){
        return {
            fresher: {
                fresherId: '',
                fresherCode:'',
                firstName:'',
                lastName:'',
                fullName:''
            }
        }
    },
    props: {
        fresher: Object
    }
}
</script>

<style>

</style>