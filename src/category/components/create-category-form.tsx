'use client'

import React from 'react'

import { CategoryClient } from '@/category/category-client'
import type { CategoryCreationData } from '@/category/domain/category-entities'
import { Form } from '@/presentation/components/forms/form'
import { TextField } from '@/presentation/components/forms/text-field'
import { Button } from '@/presentation/components/ui/pressables/button'

const createCategoryFormFields = {
  name: 'name',
  description: 'description',
  imageUrl: 'image-url'
}

export const CreateCategoryForm: React.FC = () => {
  const [isCategoryCreationLoading, setIsCategoryCreationLoading] = React.useState(false)

  const onCategoryCreationFormSubmit = async (formData: FormData) => {
    setIsCategoryCreationLoading(true)

    const categoryCreationData: CategoryCreationData = {
      name: formData.get(createCategoryFormFields.name) as string,
      description: formData.get(createCategoryFormFields.description) as string,
      imageUrl: formData.get(createCategoryFormFields.imageUrl) as string
    }

    const createdCategoryResult = await CategoryClient.createCategory(categoryCreationData)

    console.log(createdCategoryResult)
    setIsCategoryCreationLoading(false)
  }

  return (
    <Form onSubmit={onCategoryCreationFormSubmit}>
      <TextField
        isRequired
        label='Category Name'
        name={createCategoryFormFields.name}
        placeholder='Category Name'
        type='text'
      />

      <TextField
        label='Description'
        name={createCategoryFormFields.description}
        placeholder='Description'
        type='text'
      />

      <TextField
        label='Image URL'
        name={createCategoryFormFields.imageUrl}
        placeholder='Image URL'
        type='url'
      />

      <Button isPending={isCategoryCreationLoading} type='submit'>
        {isCategoryCreationLoading ? 'Creating...' : 'Create Category'}
      </Button>
    </Form>
  )
}
