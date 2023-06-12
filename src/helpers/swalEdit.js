import store from '@/store/index.js'

export default function useEditSwal({text, mutationFnName, mutationArgs, promise, context}) {
    promise
    .then(() => {
        if (mutationFnName) store.commit(mutationFnName, mutationArgs)
        context.$emit('editingCompleted', {}) //to toggle hidden-tr
        context.$toast.success(`Saved ${text}`)
    })
    .catch((err) =>{ 
        console.log(err)
        if (err != null) return context.$toast.error(`Oops! We can't perform this action right now`)
    })
    .finally(() => {
        context.disabled = false
        if (context?.polling != undefined) context.polling = true
    })
}