import store from '@/store/index.js'
import swal from 'sweetalert'

export default function useEditSwal({text, mutationFnName, mutationArgs, promise, context}) {
    swal({
        title: "Alert",
        text: `Do you really want to edit "${text}"`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
    })
    .then((value) => {
        if (value == null) throw null
        return promise()
    })
    .then(() => {
        store.commit(mutationFnName, mutationArgs)
        setTimeout(() => {
            context.$emit('editingCompleted') //to toggle hidden-tr
        }, 1)
        return swal({
            title: "Success",
            text: `Edited "${text}"`,
            icon: "success",
            button: "Ok"
        })
    })
    .catch((err) =>{ 
        if (err != null) return swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
    })
}