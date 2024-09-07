import {
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  IconChevronDown,
  IconInbox,
  IconLogout,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUser,
} from '@align/ui'

import { Link, useRoute } from 'wouter'

import { ApplicationLayoutProps, NavigationButtonProps, NavigationLinkProps } from './application-layout-props'

import './application-layout.css'

export function ApplicationLayout({ children, workspace }: ApplicationLayoutProps) {
  return (
    <div className="Application">
      <header className="ApplicationHeader">
        <nav className="ApplicationNavigation">
          <WorkspaceSelector />

          <Divider className="NavigationDivider" orientation="vertical" />

          <ul className="NavigationList">
            <NavigationLink href={`/${workspace}/issues`}>Issues</NavigationLink>
            <NavigationLink href={`/${workspace}/projects`}>Projects</NavigationLink>
            <NavigationLink href={`/${workspace}/cycles`}>Cycles</NavigationLink>
            <NavigationLink href={`/${workspace}/teams`}>Teams</NavigationLink>
            <NavigationLink href={`/${workspace}/views`}>Views</NavigationLink>
          </ul>

          <div className="NavigationFiller" />

          <ul className="NavigationButtons">
            <NavigationButton kind="icon" icon={IconSearch} />
            <NavigationButton kind="icon" icon={IconInbox} />
            <NavigationAvatar />
          </ul>
        </nav>
      </header>

      <main className="ApplicationContentWrapper">
        <div className="ApplicationContent">{children}</div>
      </main>
    </div>
  )
}

function WorkspaceSelector() {
  {
    /* TODO : Add as dropdown trigger */
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="WorkspaceSelector">
        <span className="WorkspaceSelectorAvatar">
          <span>WN</span>

          {/* TODO : Get current workspace as prop so the avatar can be rendered (if present) */}
          {/* <img className="WorkspaceSelectorAvatarImage" src="https://catalyst.tailwindui.com/tailwind-logo.svg" /> */}
        </span>

        <span className="WorkspaceSelectorTitle">Workspace Name</span>

        <IconChevronDown className="WorkspaceSelectorIcon" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Icon component={IconSettings} />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <span className="WorkspaceSelectorAvatar WorkspaceSelectorAvatarSmall">
            <span>WN</span>
          </span>
          <span>Workspace Name</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Icon component={IconPlus} />
          <span>New workspace</span>
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

function NavigationAvatar() {
  return (
    <DropdownMenu>
      <NavigationButton kind="custom" as="span">
        <DropdownMenuTrigger className="NavigationAvatarTrigger">
          {/* TODO: Replace with current user avatar, if any */}
          <img src="/Image.jpg" className="NavigationAvatar" />
        </DropdownMenuTrigger>
      </NavigationButton>

      <DropdownMenuContent align="end" className="NavigationAvatarMenu">
        <DropdownMenuItem>
          <Icon component={IconUser} />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Icon component={IconSettings} />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Icon component={IconLogout} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
