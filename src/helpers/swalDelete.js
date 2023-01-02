import store from '@/store'
import swal from 'sweetalert'

export default function useDeleteSwal({text, mutationFn, mutationArgs, promise}) {
    swal({
        icon: 'warning',
        title: 'Alert',
        text: `Do you really want to delete "${text}"`,
        buttons: true,
        dangerMode: true
    })
    .then(value => {
        if (value == null) throw null
        return promise()
    })
    .then(() => {
        store.commit(mutationFn, mutationArgs)
        return swal({
            title: "Success",
            text: `Deleted "${text}"`,
            icon: "success",
            button: 'ok'
        })
    })
    .catch(err => {
        if (err != null) return swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
    })
}