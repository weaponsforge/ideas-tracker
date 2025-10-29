'use client'

import IdeasForm from "./components/IdeasForm";
import IdeasList from "./components/IdeasList";

import { AuthProvider } from "../../hooks/useAuth";
import { IdeasProvider } from "../../hooks/useIdeas";

import NavBar from "./components/NavBar";

export default function Home() {
    return (
      <AuthProvider>
        <NavBar />

        <main className="u-padding-16">
          <div className="container">
            <h1 className="heading-level-1">Ideas Tracker</h1>

            <p className="u-margin-block-start-16">
              Track all your side project ideas in one place.
            </p>
          </div>

          <IdeasProvider>
            <IdeasForm />
            <IdeasList />
          </IdeasProvider>
        </main>
      </AuthProvider>
    );
}
