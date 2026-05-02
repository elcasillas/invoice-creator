const SUPPORTED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];

export function getCompanyLogoSrc(logoUrl: string | null | undefined) {
  if (!logoUrl) {
    return null;
  }

  if (logoUrl.startsWith("data:")) {
    return logoUrl;
  }

  try {
    const parsedUrl = new URL(logoUrl);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return null;
    }

    const pathname = parsedUrl.pathname.toLowerCase();
    const isSupported = SUPPORTED_IMAGE_EXTENSIONS.some((extension) => pathname.endsWith(extension));

    if (!isSupported) {
      return null;
    }

    return `/api/company-logo?src=${encodeURIComponent(logoUrl)}`;
  } catch {
    return null;
  }
}
