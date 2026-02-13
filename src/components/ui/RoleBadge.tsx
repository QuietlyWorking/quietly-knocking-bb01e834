interface RoleBadgeProps {
  role: string;
}

const roleStyles: Record<string, string> = {
  owner: 'bg-primary/20 text-primary',
  admin: 'bg-accent/20 text-accent',
  member: 'bg-muted text-muted-foreground',
  viewer: 'bg-muted text-muted-foreground/70',
};

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleStyles[role] || roleStyles.member}`}>
      {role}
    </span>
  );
}
