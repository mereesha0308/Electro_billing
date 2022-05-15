$(document).ready(function (){

   //load table data on page load
   loadBills();

   /**
    * save or update user details when save button clicked
    */
   $('.btn-save').on('click', function (){

      let from_data = {};
      from_data.Id = $("#txtId").val()
      from_data.cusId = $("#txtCusId").val()
      from_data.address = $("#txtAddress").val()
      from_data.unit = $("#txtUnit").val()
      from_data.year = $("#txtYear").val()
from_data.month = $("#txtMonth").val()
//from_data.total = $("#txtTotal").val()


      //identifying request type based on button text
      const reqType = $('.btn-save').text() === 'Save' ? 'POST' : 'PUT'

      $.ajax({
         type: reqType,
         url: "billing/bills/bill",
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         data: JSON.stringify(from_data),
         success: function (data) {

            resetForm()

            //reload table
            loadBills()

            alert("Bill details saved successfully");
         },
         error: function (e) {
            alert("Something went wrong while saving data!");
         }
      });


   })

   /**
    * load user details when edit button clicked
    */
   $('#tblBills').on('click', '.btn-edit' ,function (){

      const id = $(this).attr('id')

      $.ajax({
         type: 'GET',
         url: `billing/bills/bill/${id}`,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            if(data){
               $("#txtId").val(data.Id);
               $("#txtCusId").val(data.cusId);
               $("#txtAddress").val(data.address);
               $("#txtUnit").val(data.unit);
               $("#txtYear").val(data.year);
$("#txtMonth").val(data.month);

               //change button text
               $('.btn-save').text('Update')

               //reload table
               loadBills()

            }else {
               alert("Bill details not found!")
            }
         },
         error: function (e) {
            alert("Something went wrong while retrieving data!");
         }
      });
   })

   /**
    * delete selected user details when delete button clicked
    */
   $('#tblBills').on('click', '.btn-delete' ,function (){

      const id = $(this).attr('id')

      $.ajax({
         type: 'DELETE',
         url: `billing/bills/bill/${id}`,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            alert("Bill details deleted successfully")

            //clear form
            resetForm()

            //reload table
            loadBills()

         },
         error: function (e) {
            alert("Something went wrong while deleting data!");
         }
      });
   })

   //clear form
   function  resetForm(){
      $("#txtId").val(null);
      $("#txtCusId").val(null);
      $("#txtAddress").val(null);
      $("#txtUnit").val(null);
      $("#txtYear").val(null);
 $("#txtMonth").val(null);
      //change button text
      $('.btn-save').text('Save')

   }

   /**
    * populate table data
    */
   function loadBillss(){
      $.ajax({
         type: 'GET',
         url: "billing/bills",
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            $('tbody#tblUsersBody').empty()
            if (data !== null){

               const bills = data

               //loop through data list and populate table body
               for(i in bills){
                  $('tbody#tblBillsBody').append(
                      `<tr>
 <td>${bills[i].Id}</td>
                          <td>${bills[i].cudId}</td> 
 <td>${bills[i].address}</td>
 <td>${bills[i].unit}</td>
 <td>${bills[i].year}</td> 
 <td>${bills[i].month}</td>
 <td>${bills[i].total}</td>
                           <td>
                             <span class="badge bg-warning text-dark btn-edit" id="${bills[i].Id}" style="cursor: pointer;">Edit</span>
                             <span class="badge bg-danger btn-delete" id="${bills[i].Id}" style="cursor: pointer;">Delete</span>
                           </td>
                       </tr>`
                  )
               }

            }else{
               `<tr>
                  <td colspan="4">Data Not found</td>                  
               </tr>`
            }
         },
         error: function (e) {
            alert("Something went wrong while loading table data!");
         }
      });
   }

});