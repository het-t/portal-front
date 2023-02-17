export default function useCreateSwal({text, url, mutationFnName, mutationArgs, promise, context}) {
    let args = mutationArgs
    if (args == undefined) args = {}

    promise
    .then(() =>
        context.$toast.success(`saved ${text}`)
    )
    .then(() => { 
        if (mutationFnName) context.$store.commit(mutationFnName, args)
        setTimeout(() => context.$router.push(url), 1)
    })
    .catch((err) => {
        if (err != null) context.$toast.error(`Oops! We can't perform this action right now`)
    })
    .finally(() => {
        context.disabled = false
    })
}