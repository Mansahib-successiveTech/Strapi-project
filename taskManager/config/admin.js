module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },


  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL'), // your frontend URL (Next.js)

      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL');
        const previewSecret = env('PREVIEW_SECRET');

        // Fetch the document data from Strapi
        const document = await strapi.documents(uid).findOne({ documentId });

        // Build preview pathname using /projects/[projectId]
        const getPreviewPathname = (uid, { document }) => {
          switch (uid) {
            case 'api::project.project':
              return `/projects/${documentId}`; // <-- your route
            default:
              return null;
          }
        };

        const pathname = getPreviewPathname(uid, { document });
        if (!pathname) return null;

        // Build the preview URL with params
        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: previewSecret,
          status,
        });

        return `${clientUrl}/api/preview?${urlSearchParams}`;
      },
    },
  },
});
