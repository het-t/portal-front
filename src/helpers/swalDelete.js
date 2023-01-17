import store from '@/store'
import swal from 'sweetalert'

export default function useDeleteSwal({text, mutationFn, mutationArgs, promise, context}) {
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
        return context.$toast.success("Deleted")
    })
    .catch(err => {
        if (err != null) context.$toast.error(`Oops! We can't perform this action right now`)
    })
}