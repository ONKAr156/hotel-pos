import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AddTables = () => {

  const [tData, setTData] = useState()
  const [editTableId, setEditTableId] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [formData, setFormData] = useState({
    capacity: "",
  });
  const [refreshData, setRefreshData] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const newTable = await axios.post("http://localhost:3000/api/admin/add-new-Table", formData)
      if (newTable.status === 201) {
        setRefreshData(prev => !prev);
        toast.success("Table added success!!")
        console.log(newTable.data);

      }
    } catch (error) {
      console.log(error);
    }

  };

  const handelDeleteTable = async (id) => {
    try {
      const deleteTableData = await axios.delete(`http://localhost:3000/api/admin/delete-table/${id}`)
      if (deleteTableData.status === 200) {
        setRefreshData(prev => !prev);
        toast.success("Table deleted successfully")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCapacityChange = (event) => {
    setNewCapacity(event.target.value);
  };

  // This function will be invoked when the 'Save changes' button is clicked
  const handleUpdateTable = async () => {
    if (!editTableId || !newCapacity) {
      toast.error("Please select a table and capacity to update.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/admin/update-table/${editTableId}`, {
        capacity: newCapacity
      });

      if (response.status === 200) {
        setRefreshData(prev => !prev); // triggers useEffect to refetch tables
        toast.success("Table updated successfully!");

        // Reset values and potentially close the modal
        setEditTableId("");
        setNewCapacity("");
        // Close theBootstrap modal programmatically if needed
        // $('#exampleModal').modal('hide');
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the table.");
    }
  };


  useEffect(() => {
    const getAllTables = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/admin/get-all-tables")
        setTData(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAllTables()
  }, [refreshData])
  console.log(tData);

  return <>

    <div className='h-full' >
      <h2 className='m-2 font-medium'>Table Details</h2>
      <form className='border rounded-md m-2 flex gap-2 justify-between items-center border-black p-4' onSubmit={handleSubmit}>
        <p className='font-semibold   border-2 border-dashed p-2'>For adding new table, select the table capacity</p>

        <div className='my-2'>
          <label for="capacity" className="form-label fw-semibold">capacity</label>
          <select className="form-select" name='capacity' onChange={handleInputChange} id='category'>
            <option value="">Open this select menu</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>

          </select>
        </div>



        <div className='mt-4 '>
          <button type='submit' className='bg-blue-600 p-2 my-2 text-white'>Add</button>
        </div>
      </form>

      <div class="flex flex-col mt-4">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" class="p-3 text-center text-xs font-medium text-gray-500 uppercase">Table-ID</th>
                    <th scope="col" class="p-3 text-center text-xs font-medium text-gray-500 uppercase">capacity</th>
                    <th scope="col" class="p-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {
                    tData && tData.map((item, a) => <tr className='text-center' key={item._id}>
                      <td>{item.id}</td>
                      <td>{item.capacity} seats</td>
                      <td>
                        <button
                          onClick={e => handelDeleteTable(item._id)}
                          className='bg-red-600 text-white p-2 mx-2'>delete</button>
                        <button
                          onClick={e => setEditTableId(item._id)}
                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                          className='bg-blue-600 text-white p-2 mx-2'>edit</button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Table status</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div className='my-2'>
              <label for="capacity" className="form-label fw-semibold">capacity</label>
              <select className="form-select" name='capacity' value={newCapacity} onChange={handleCapacityChange} id='category'>
                <option value="">Open this select menu</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>

              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onClick={handleUpdateTable} type="button" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>

    </div>

  </>
}

export default AddTables