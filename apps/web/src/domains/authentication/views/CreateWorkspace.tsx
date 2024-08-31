type CreateWorkspaceProps = {}

// todo: handle debounce available workspace name check in form state:
// https://github.com/giuseppemag/ballerina/blob/main/guidelines.md#statets

export const CreateWorkspace = ({}: CreateWorkspaceProps) => {
  return (
    <main>
      <header className="fixed">
        <button>Log out</button>

        <div>
          <span>Logged in as</span>
          <span>johndoe@gmail.com</span>
        </div>
      </header>

      <div>
        <div>
          <h1>Create a workspace</h1>
          <p></p>
        </div>

        <div>
          <div></div>

          <hr></hr>

          <div>
            <div>
              <label>How large is your company?</label>
              <select></select>
            </div>

            <div>
              <label>What is your role?</label>
              <select></select>
            </div>
          </div>
        </div>

        <button>Create workspace</button>
      </div>
    </main>
  )
}
