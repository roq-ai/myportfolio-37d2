const mapping: Record<string, string> = {
  'd-models': 'd_model',
  comments: 'comment',
  universities: 'university',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
