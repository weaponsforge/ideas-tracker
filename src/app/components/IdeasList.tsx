'use client'

import { useAuth } from "../../../hooks/useAuth"
import { useIdeas, type Idea } from "../../../hooks/useIdeas"

const IdeasList = () => {
  const { current: ideas, loading, remove } = useIdeas()
  const { current: user } = useAuth()

  if (loading) {
    return <div>Loading ideas...</div>
  }

  if (ideas.length === 0) {
    return (
      <div className="container u-margin-block-start-16">
        <p>No ideas yet. Be the first to share one!</p>
      </div>
    )
  }

  return (
    <div className="container u-margin-block-start-16">
      <h4 className="heading-level-4 u-margin-block-end-16">Latest Ideas</h4>

      <ul className="u-margin-0 u-padding-0">
        {ideas.map((idea) => (
          <li key={idea.$id} className="card u-margin-block-end-16">
            <div className="u-flex u-main-space-between">
              <div className="u-flex-grow-1">
                <h5 className="heading-level-5">{idea.title}</h5>

                {idea.description && (
                  <p className="u-margin-block-start-8">
                    {idea.description}
                  </p>
                )}
              </div>

              {user && user.$id === idea.userId && (
                <button
                  onClick={() => remove(idea.$id)}
                  className="button is-text u-padding-inline-0"
                  aria-label="Delete Idea"
                >
                  🗑️
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IdeasList
