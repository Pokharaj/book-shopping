import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'book/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // These IDs match the mock data in book-list and book-details
      return [
        { id: '1' },
        { id: '2' },
        { id: '3' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
