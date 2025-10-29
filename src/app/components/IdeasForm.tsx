'use client'

import { useAuth } from "../../../hooks/useAuth"
import { useIdeas } from "../../../hooks/useIdeas"

const IdeasForm = () => {
  const { add } = useIdeas()
  const { current: user } = useAuth()

  const handleAddIdea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    if (!user) return

    console.log('--user is', user)

    const postIdeaData = {
      userId: user.$id,
      title: formData.get('title') as string,
      description: formData.get('description') as string
    }

    await add(postIdeaData)
    form.reset()
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <article className="container padding-0" style={{ backgroundColor: '#FFF' }}>
        <h4 className="heading-level-4">Submit Idea</h4>

        <form onSubmit={handleAddIdea} className="u-margin-block-start-16">
          <ul className="form-list">
            <li className="form-item">
              <label className="label">Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                required
              />
            </li>

            <li className="form-item">
              <label className="label">Description</label>
              <textarea
                placeholder="Description"
                name="description"
                rows={4}
              />
            </li>
          </ul>

          <ul className="buttons-list u-margin-block-start-16">
            <li className="buttons-list-item">
              <button
                type="submit"
                className="button"
                aria-label="Submit Idea"
              >
                Submit
              </button>
            </li>
          </ul>
        </form>
      </article>
    </div>
  )
}

export default IdeasForm
