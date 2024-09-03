import { Link } from 'wouter'

/**
 * Views:
 *
 * - Login (used to login to the application)
 *      -> If user is member of any workspaces, send to the last visited workspace
 *
 * - Signup (used to create a new account with email and password)
 *      -> If user is member of any workspaces (e.g. invited by email to signup for worksapce),
 *         send to the last visited workspace. Otherwise, send to workspace creation
 * 
 * - Workspace list
 *      -> Will be shown if no recent workspace can be found. same layout as login page (same as signup and workspace creation too)
 *
 * - Workspace creation (Shows workspace creation form, Screenshot 2024-08-25 211336.png) 
 *      -> The newly created workspace.
 */ 

type RegisterProps = {}

export const Register = ({}: RegisterProps) => {
  return (
    <main>
      <div>
        <h1>Create your account</h1>

        <div>
          <div>
            <label>Email</label>
            <input />
          </div>

          <div>
            <label>Password</label>
            <input />
          </div>

          <button>Get started</button>
        </div>

        <p>
          By signing up, you agree to our <a>Terms of Service</a> and <a>Data Processing Agreement</a>
        </p>

        <hr />

        <div>
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  )
}
