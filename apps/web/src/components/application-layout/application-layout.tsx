import { AnimatePresence, motion } from 'framer-motion'
import { Link, useRoute } from 'wouter'

import {
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  IconCheck,
  IconChevronDown,
  IconInbox,
  IconLogout,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUser,
} from '@align/ui'

import {
  ApplicationLayoutProps,
  NavigationAvatarProps,
  NavigationButtonProps,
  NavigationLinkProps,
  WorkspaceSelectorProps,
} from './application-layout-props'

import { getInitials } from '#/lib/name'
import { routes } from '#/lib/routes'

import './application-layout.css'

export function ApplicationLayout({ children, workspace, user, handleLogout }: ApplicationLayoutProps) {
  return (
    <AnimatePresence initial={true}>
      <motion.div className="Application" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <header className="ApplicationHeader">
          <nav className="ApplicationNavigation">
            <WorkspaceSelector workspace={workspace} user={user} />

            <Divider className="NavigationDivider" orientation="vertical" />

            <ul className="NavigationList">
              <NavigationLink href={`/${workspace}/issues`}>Issues</NavigationLink>
              <NavigationLink href={`/${workspace}/projects`}>Projects</NavigationLink>
              <NavigationLink href={`/${workspace}/cycles`}>Cycles</NavigationLink>
              <NavigationLink href={`/${workspace}/teams`}>Teams</NavigationLink>
            </ul>

            <div className="NavigationFiller" />

            <ul className="NavigationButtons">
              <NavigationButton kind="icon" icon={IconSearch} />
              <NavigationButton kind="icon" icon={IconInbox} />
              <NavigationAvatar workspace={workspace} user={user} handleLogout={handleLogout} />
            </ul>
          </nav>
        </header>

        <main className="ApplicationContentWrapper">
          <div className="ApplicationContent">
            {children}

            {workspace}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}

function WorkspaceSelector({ user, workspace }: WorkspaceSelectorProps) {
  const activeWorkspace = user.workspaceMemberships.find((w) => w.workspace.url === workspace)

  if (!activeWorkspace) {
    throw new Error("Something is very wrong. User is in a workspace which they don't have access to.")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="WorkspaceSelectorTrigger">
        <span className="WorkspaceSelectorAvatar">
          <span>{getInitials(activeWorkspace.workspace.name)}</span>
          {/* <img className="WorkspaceSelectorAvatarImage" src="https://catalyst.tailwindui.com/tailwind-logo.svg" /> */}
        </span>

        <span className="WorkspaceSelectorTitle">{activeWorkspace.workspace.name}</span>

        <IconChevronDown className="WorkspaceSelectorIcon" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="WorkspaceSelectorContent">
        <DropdownMenuItem asChild>
          <Link to={routes.workspace.settings(workspace).index}>
            <Icon component={IconSettings} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {user.workspaceMemberships.map((membership) => {
          const isActiveWorkspace = membership.workspace.url === workspace

          return (
            <DropdownMenuItem
              onClick={() => {
                if (!isActiveWorkspace) {
                  window.location.assign(routes.workspace.inbox(membership.workspace.url))
                }
              }}
            >
              <span className="WorkspaceSelectorAvatar WorkspaceSelectorAvatarSmall">
                <span>{getInitials(membership.workspace.name)}</span>
              </span>
              <span>{membership.workspace.name}</span>

              {isActiveWorkspace && <Icon component={IconCheck} className="ActiveWorkspaceIndicator" />}
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to={routes.auth.createWorkspace}>
            <Icon component={IconPlus} />
            <span>New workspace</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NavigationLink({ href, children }: NavigationLinkProps) {
  const [match] = useRoute(href)

  return (
    <li className="NavigationLinkWrapper">
      {match && <span className="NavigationLinkDecoration"></span>}

      <Link className="NavigationLink" href={href}>
        {children}
      </Link>
    </li>
  )
}

function NavigationButton(props: NavigationButtonProps) {
  const Component = props.as || 'button'

  return (
    <Component className="NavigationButton">
      {props.kind === 'icon' ? <Icon className="NavigationButtonIcon" component={props.icon} /> : props.children}
    </Component>
  )
}

function NavigationAvatar({ user, workspace, handleLogout }: NavigationAvatarProps) {
  return (
    <DropdownMenu>
      <NavigationButton kind="custom" as="span">
        <DropdownMenuTrigger className="NavigationAvatarTrigger">
          {/* TODO: Replace with current user avatar, if any */}
          <img src="/Image.jpg" className="NavigationAvatar" />
        </DropdownMenuTrigger>
      </NavigationButton>

      <DropdownMenuContent align="end" className="NavigationAvatarMenu">
        <DropdownMenuItem asChild>
          <Link to={routes.workspace.settings(workspace).account.profile}>
            <Icon component={IconUser} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to={routes.workspace.settings(workspace).account.preferences}>
            <Icon component={IconUser} />
            <span>Preferences</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <Icon component={IconLogout} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
