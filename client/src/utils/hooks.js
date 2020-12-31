import { useMutation } from '@apollo/client'
import { useState } from 'react'

export const useForm = (update, request) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [callback, { loading }] = useMutation(request, {
    update,
    variables: values,
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
  })
  const onChange = ({ target: { name, value } }) =>
    setValues({ ...values, [name]: value })
  const onSubmit = (event) => {
    event.preventDefault()
    callback()
  }

  return {
    onChange,
    onSubmit,
    loading,
    errors,
    values
  }
}
