import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const type = searchParams.get('type') || 'solution';
    const description = searchParams.get('description');

    // Load the Poppins font from Google Fonts
    const poppins = await fetch(
      'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '40px 80px',
            backgroundImage: 'linear-gradient(145deg, rgba(40,140,255,0.1), rgba(0,200,150,0.1))',
            backgroundColor: 'white',
          }}
        >
          {/* Logo */}
          <img
            src={`${SITE.baseUrl}${SITE.org.logo}`}
            alt={SITE.brand}
            style={{
              height: '40px',
            }}
          />

          {/* Content */}
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontSize: '18px',
                textTransform: 'uppercase',
                color: 'rgb(63, 63, 70)',
                letterSpacing: '0.05em',
                marginBottom: '20px',
              }}
            >
              {type === 'insight' ? 'Solenergy Insights' : 'Solar Energy Solutions'}
            </div>
            <div
              style={{
                fontSize: '60px',
                fontFamily: 'Poppins',
                fontWeight: 700,
                letterSpacing: '-0.05em',
                lineHeight: 1.2,
                marginBottom: '20px',
                background: 'linear-gradient(90deg, #F4B41A, #E8952F)',
                backgroundClip: 'text',
                color: 'transparent',
                maxWidth: '800px',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: '24px',
                  color: 'rgb(82, 82, 91)',
                  maxWidth: '600px',
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '16px',
              color: 'rgb(113, 113, 122)',
            }}
          >
            solenergy.me
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Poppins',
            data: poppins,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`Failed to generate OG image: ${e.message}`);
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}