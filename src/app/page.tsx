'use client'

import IdeasForm from "./components/IdeasForm";
import IdeasList from "./components/IdeasList";

import useIdeas from "../../hooks/useIdeas";

export default function Home() {
  const ideasApi = useIdeas()

    return (
        <main className="u-padding-16">
            <div className="container">
                <h1 className="heading-level-1">Ideas Tracker</h1>
                <p className="u-margin-block-start-16">
                    Track all your side project ideas in one place.
                </p>
            </div>

            <IdeasForm add={ideasApi.add} />

            <IdeasList
              ideas={ideasApi.current}
              loading={ideasApi.loading}
              remove={ideasApi.remove}
            />
        </main>
    );
}
