import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 16, height: 16 },
            id: '16',
        },
        {
            contentType: 'image/png',
            size: { width: 32, height: 32 },
            id: '32',
        },
        {
            contentType: 'image/png',
            size: { width: 48, height: 48 },
            id: '48',
        },
        {
            contentType: 'image/png',
            size: { width: 180, height: 180 },
            id: '180',
        },
        {
            contentType: 'image/png',
            size: { width: 192, height: 192 },
            id: '192',
        },
        {
            contentType: 'image/png',
            size: { width: 512, height: 512 },
            id: '512',
        },
    ]
}

// Image generation
export default function Icon({ id }: { id: string }) {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#ffffff',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg width="84" height="85" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: '90%',
                        height: '90%',
                    }}
                >
                    <mask id="mask0_98_1782" maskUnits="userSpaceOnUse" x="0" y="0" width="84" height="85">
                        <circle cx="41.7971" cy="42.6687" r="41.7546" fill="white" />
                    </mask>
                    <g mask="url(#mask0_98_1782)">
                        <circle cx="41.7971" cy="42.6687" r="41.7546" fill="#40319D" />
                        <path d="M18.7314 83.3765C19.1076 82.7809 19.7629 82.4198 20.4673 82.4198H55.6521C57.2693 82.4198 58.2517 84.2025 57.388 85.5697L45.7119 104.053C45.3357 104.649 44.6804 105.01 43.9759 105.01H8.79117C7.17401 105.01 6.19156 103.227 7.05524 101.86L18.7314 83.3765Z" fill="#A79AF1" />
                        <path d="M62.9506 83.3765C63.3269 82.7809 63.9821 82.4198 64.6866 82.4198H99.8714C101.489 82.4198 102.471 84.2025 101.607 85.5697L89.9311 104.053C89.5549 104.649 88.8996 105.01 88.1952 105.01H53.0104C51.3932 105.01 50.4108 103.227 51.2745 101.86L62.9506 83.3765Z" fill="#A79AF1" />
                        <path d="M34.1123 57.4218C34.4885 56.8262 35.1438 56.4651 35.8482 56.4651H71.033C72.6501 56.4651 73.6326 58.2478 72.7689 59.615L61.0927 78.0985C60.7165 78.6941 60.0612 79.0552 59.3568 79.0552H24.172C22.5549 79.0552 21.5724 77.2725 22.4361 75.9053L34.1123 57.4218Z" fill="#A79AF1" />
                        <path d="M78.331 57.4218C78.7072 56.8262 79.3625 56.4651 80.067 56.4651H115.252C116.869 56.4651 117.851 58.2478 116.988 59.615L105.311 78.0985C104.935 78.6941 104.28 79.0552 103.576 79.0552H68.3908C66.7736 79.0552 65.7912 77.2725 66.6548 75.9053L78.331 57.4218Z" fill="#A79AF1" />
                        <path d="M64.3618 34.9568C64.3618 49.1021 48.67 63.8337 43.4006 68.3835C42.9097 68.7527 42.3122 68.9523 41.698 68.9523C41.0838 68.9523 40.4863 68.7527 39.9954 68.3835C34.726 63.8337 19.0342 49.1021 19.0342 34.9568C19.0342 28.9459 21.422 23.1812 25.6723 18.9309C29.9225 14.6805 35.6872 12.2927 41.698 12.2927C47.7088 12.2927 53.4734 14.6805 57.7237 18.9309C61.974 23.1812 64.3618 28.9459 64.3618 34.9568Z" fill="#EFF2FA" stroke="#40319D" stroke-width="4.89314" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </svg>
            </div>
        ),
        {
            width: Number(id),
            height: Number(id),
        }
    )
}
