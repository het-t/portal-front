import store from '@/store/index.js'
import swal from 'sweetalert'

export default function useEditSwal({text, mutationFnName, mutationArgs, promise, context}) {
    promise
    .then(() => {
        if (mutationFnName) store.commit(mutationFnName, mutationArgs)
        context.$emit('editingCompleted', {}) //to toggle hidden-tr
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
    .finally(() => {
        context.disabled = false
    })
}