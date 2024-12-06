import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 fixed inset-0 flex items-center bg-white/80 backdrop-blur-lg h-24">
      <div className="sm:px-6 py-6 container">
        <div className="flex justify-between items-center gap-5">
          <Link className="flex items-center gap-2" href="/">
            <svg width="275" height="103" viewBox="0 0 275 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M247.124 83.7216V67.2114H257.082V68.4414H248.543V74.7333H256.774V75.9633H248.543V82.4917H257.082V83.7216H247.124Z" fill="#40319D" />
              <path d="M238.452 68.4414V83.7216H237.033V68.4414H231.379V67.2114H244.105V68.4414H238.452Z" fill="#40319D" />
              <path d="M228.243 83.7216L226.682 78.6834H220.437L218.852 83.7216H217.386L222.637 67.2114H224.505L229.733 83.7216H228.243ZM223.63 68.7253H223.465L220.768 77.4534H226.327L223.63 68.7253Z" fill="#40319D" />
              <path d="M210.086 68.4414V83.7216H208.667V68.4414H203.014V67.2114H215.739V68.4414H210.086Z" fill="#40319D" />
              <path d="M195.194 84.0055C194.452 84.0055 193.79 83.9346 193.207 83.7926C192.623 83.6507 192.095 83.4615 191.622 83.2249C191.149 82.9726 190.723 82.673 190.345 82.3261C189.982 81.9792 189.651 81.6007 189.351 81.1907L190.392 80.3392C191.007 81.1277 191.685 81.7348 192.426 82.1605C193.167 82.5705 194.105 82.7755 195.241 82.7755C196.565 82.7755 197.583 82.4838 198.292 81.9003C199.002 81.3011 199.357 80.4417 199.357 79.3221C199.357 78.2971 199.057 77.5402 198.458 77.0514C197.874 76.5625 197.038 76.2314 195.95 76.0579L194.105 75.7504C193.285 75.6085 192.6 75.3956 192.048 75.1118C191.511 74.8279 191.078 74.4968 190.747 74.1183C190.415 73.7241 190.179 73.2904 190.037 72.8174C189.911 72.3443 189.848 71.8554 189.848 71.3508C189.848 69.8685 190.329 68.7647 191.291 68.0393C192.268 67.2982 193.577 66.9276 195.217 66.9276C196.558 66.9276 197.653 67.1484 198.505 67.5899C199.372 68.0157 200.066 68.607 200.587 69.3639L199.593 70.2391C199.12 69.5768 198.537 69.0643 197.843 68.7016C197.165 68.3389 196.274 68.1576 195.17 68.1576C193.94 68.1576 192.978 68.4257 192.284 68.9618C191.606 69.4822 191.267 70.2628 191.267 71.3035C191.267 72.2654 191.551 72.9987 192.119 73.5033C192.686 73.9922 193.53 74.3233 194.649 74.4968L196.471 74.8043C197.307 74.9462 198 75.167 198.552 75.4666C199.104 75.7504 199.546 76.0894 199.877 76.4837C200.208 76.8779 200.437 77.3115 200.563 77.7846C200.705 78.2577 200.776 78.7544 200.776 79.2748C200.776 80.7886 200.287 81.9555 199.309 82.7755C198.332 83.5955 196.96 84.0055 195.194 84.0055Z" fill="#40319D" />
              <path d="M176.209 83.7216V67.2114H186.167V68.4414H177.628V74.7333H185.86V75.9633H177.628V82.4917H186.167V83.7216H176.209Z" fill="#40319D" />
              <path d="M148.624 83.7216V67.2114H150.043V82.4917H158.133V83.7216H148.624Z" fill="#40319D" />
              <path d="M143.146 83.7216L141.584 78.6834H135.34L133.755 83.7216H132.289L137.54 67.2114H139.408L144.636 83.7216H143.146ZM138.533 68.7253H138.368L135.671 77.4534H141.23L138.533 68.7253Z" fill="#40319D" />
              <path d="M119.478 83.7216V67.2114H129.436V68.4414H120.897V74.7333H129.128V75.9633H120.897V82.4917H129.436V83.7216H119.478Z" fill="#40319D" />
              <path d="M106.714 83.7216H105.294V67.2114H111.208C112.674 67.2114 113.786 67.6293 114.543 68.4651C115.3 69.2851 115.678 70.4125 115.678 71.8475C115.678 73.1879 115.331 74.2602 114.638 75.0644C113.96 75.8686 112.95 76.3102 111.61 76.389H111.255L115.726 83.7216H114.141L109.789 76.46H106.714V83.7216ZM111.184 75.2537C112.178 75.2537 112.927 74.9856 113.431 74.4494C113.936 73.9133 114.188 73.2352 114.188 72.4152V71.2798C114.188 70.4599 113.936 69.7818 113.431 69.2456C112.927 68.7095 112.178 68.4414 111.184 68.4414H106.714V75.2537H111.184Z" fill="#40319D" />
              <path d="M247.104 53.887V28.3849H252.494L253.008 32.8925H253.155C254.07 31.2266 255.164 29.9609 256.438 29.0953C257.728 28.2134 259.051 27.7725 260.407 27.7725C261.076 27.7725 261.64 27.8215 262.097 27.9194C262.554 28.0011 262.979 28.1236 263.371 28.2869L262.048 33.8969C261.623 33.7826 261.231 33.7009 260.872 33.6519C260.529 33.6029 260.088 33.5784 259.549 33.5784C258.553 33.5784 257.508 33.954 256.414 34.7053C255.336 35.4566 254.437 36.7631 253.719 38.6249V53.887H247.104Z" fill="#40319D" />
              <path d="M230.702 54.4994C228.579 54.4994 226.586 53.9768 224.724 52.9316C222.863 51.8863 221.352 50.3675 220.192 48.375C219.049 46.3825 218.478 43.9736 218.478 41.1482C218.478 38.3391 219.049 35.9384 220.192 33.9459C221.352 31.9371 222.863 30.41 224.724 29.3648C226.586 28.3032 228.579 27.7725 230.702 27.7725C232.858 27.7725 234.866 28.3032 236.728 29.3648C238.59 30.41 240.093 31.9371 241.236 33.9459C242.379 35.9384 242.951 38.3391 242.951 41.1482C242.951 43.9736 242.379 46.3825 241.236 48.375C240.093 50.3675 238.59 51.8863 236.728 52.9316C234.866 53.9768 232.858 54.4994 230.702 54.4994ZM230.702 49.1834C232.466 49.1834 233.821 48.4567 234.769 47.0031C235.732 45.5333 236.214 43.5816 236.214 41.1482C236.214 38.7311 235.732 36.7958 234.769 35.3422C233.821 33.8724 232.466 33.1375 230.702 33.1375C228.954 33.1375 227.607 33.8724 226.66 35.3422C225.713 36.7958 225.239 38.7311 225.239 41.1482C225.239 43.5816 225.713 45.5333 226.66 47.0031C227.607 48.4567 228.954 49.1834 230.702 49.1834Z" fill="#40319D" />
              <path d="M206.337 54.4994C204.59 54.4994 202.85 54.181 201.119 53.544C199.388 52.8908 197.894 51.9598 196.636 50.7513L199.527 47.0276C200.638 47.9422 201.773 48.6037 202.932 49.012C204.108 49.4039 205.308 49.5999 206.533 49.5999C207.807 49.5999 208.746 49.3468 209.351 48.8405C209.971 48.3179 210.281 47.6564 210.281 46.8562C210.281 45.8926 209.759 45.1495 208.714 44.6269C207.685 44.1043 206.468 43.5816 205.063 43.059C203.839 42.6181 202.695 42.0709 201.634 41.4177C200.572 40.7481 199.715 39.9396 199.062 38.9924C198.408 38.0288 198.082 36.8774 198.082 35.5382C198.082 33.2681 198.923 31.4063 200.605 29.9528C202.303 28.4992 204.606 27.7725 207.513 27.7725C209.293 27.7725 210.918 28.0746 212.388 28.6789C213.858 29.2668 215.124 30.0099 216.185 30.9082L213.344 34.6318C211.563 33.3416 209.685 32.6965 207.709 32.6965C206.517 32.6965 205.643 32.9415 205.088 33.4314C204.549 33.9214 204.28 34.5175 204.28 35.2198C204.28 36.0853 204.696 36.7549 205.529 37.2286C206.362 37.6859 207.57 38.184 209.155 38.7229C210.477 39.1639 211.686 39.711 212.78 40.3643C213.891 41.0175 214.781 41.8423 215.45 42.8385C216.12 43.8184 216.455 45.0352 216.455 46.4887C216.455 48.7261 215.589 50.6206 213.858 52.1722C212.143 53.7237 209.636 54.4994 206.337 54.4994Z" fill="#40319D" />
              <path d="M186.75 53.887V28.385H193.364V53.887H186.75ZM190.081 24.2203C188.938 24.2203 188.007 23.8855 187.289 23.2159C186.586 22.5463 186.235 21.6644 186.235 20.5702C186.235 19.5086 186.586 18.6512 187.289 17.9979C188.007 17.3283 188.938 16.9935 190.081 16.9935C191.225 16.9935 192.147 17.3283 192.85 17.9979C193.568 18.6512 193.928 19.5086 193.928 20.5702C193.928 21.6644 193.568 22.5463 192.85 23.2159C192.147 23.8855 191.225 24.2203 190.081 24.2203Z" fill="#40319D" />
              <path d="M167.873 53.8871L159.103 28.385H165.741L169.539 41.1483C169.865 42.4222 170.2 43.7124 170.543 45.0189C170.902 46.3255 171.245 47.6239 171.572 48.9141H171.792C172.135 47.6239 172.486 46.3255 172.846 45.0189C173.205 43.7124 173.556 42.4222 173.899 41.1483L177.696 28.385H183.992L175.491 53.8871H167.873Z" fill="#40319D" />
              <path d="M143.215 54.4995C140.063 54.4995 137.539 53.3236 135.645 50.9719C133.75 48.6201 132.803 45.3456 132.803 41.1483C132.803 38.3719 133.31 35.9874 134.322 33.995C135.351 32.0025 136.682 30.4673 138.315 29.3894C139.948 28.3115 141.671 27.7725 143.484 27.7725C144.921 27.7725 146.138 28.0257 147.134 28.532C148.131 29.0219 149.094 29.6834 150.025 30.5163L149.805 26.5232V17.4835H156.394V53.8871H150.981L150.515 51.2168H150.319C149.388 52.1477 148.302 52.9317 147.061 53.5686C145.836 54.1892 144.554 54.4995 143.215 54.4995ZM144.93 49.11C145.844 49.11 146.685 48.9059 147.453 48.4976C148.237 48.0893 149.021 47.4197 149.805 46.4888V35.1464C149.004 34.4278 148.188 33.9215 147.355 33.6275C146.538 33.3172 145.738 33.162 144.954 33.162C143.484 33.162 142.21 33.848 141.132 35.2198C140.071 36.5754 139.54 38.5434 139.54 41.1238C139.54 43.7859 140.014 45.7865 140.961 47.1257C141.908 48.4486 143.231 49.11 144.93 49.11Z" fill="#40319D" />
              <path d="M132.373 53.887H125.366L122.941 45.1659H112.015L109.565 53.887H102.829L113.657 20.1047H121.471L132.373 53.887ZM114.465 36.2487L113.412 39.9969H121.52L120.467 36.2487C119.977 34.4849 119.487 32.6639 118.997 30.7857C118.507 28.8912 118.025 27.0376 117.552 25.2248H117.356C116.915 27.0539 116.441 28.9076 115.935 30.7857C115.445 32.6639 114.955 34.4849 114.465 36.2487Z" fill="#40319D" />
              <mask
                id="mask0_1_1526"
                maskUnits="userSpaceOnUse"
                x="9"
                y="9"
                width="84"
                height="84"
                style={{ maskType: 'luminance' }}
              >
                <circle cx="51.2454" cy="51.2454" r="41.7546" fill="white" />
              </mask>
              <g mask="url(#mask0_1_1526)">
                <circle cx="51.2454" cy="51.2454" r="41.7546" fill="#40319D" />
                <path d="M13.1796 73.9531C13.5559 73.3576 14.2111 72.9965 14.9156 72.9965H50.1004C51.7175 72.9965 52.7 74.7791 51.8363 76.1464L40.1601 94.6299C39.7839 95.2255 39.1286 95.5866 38.4242 95.5866H3.23941C1.62225 95.5866 0.639801 93.8039 1.50348 92.4367L13.1796 73.9531Z" fill="#A79AF1" />
                <path d="M57.3989 73.9531C57.7751 73.3576 58.4304 72.9965 59.1348 72.9965H94.3196C95.9368 72.9965 96.9192 74.7791 96.0555 76.1464L84.3794 94.6299C84.0031 95.2255 83.3479 95.5866 82.6434 95.5866H47.4587C45.8415 95.5866 44.859 93.8039 45.7227 92.4367L57.3989 73.9531Z" fill="#A79AF1" />
                <path d="M28.5605 47.9986C28.9367 47.403 29.592 47.0419 30.2964 47.0419H65.4812C67.0984 47.0419 68.0808 48.8245 67.2171 50.1918L55.541 68.6753C55.1648 69.2709 54.5095 69.632 53.805 69.632H18.6203C17.0031 69.632 16.0207 67.8493 16.8843 66.4821L28.5605 47.9986Z" fill="#A79AF1" />
                <path d="M72.7793 47.9986C73.1555 47.403 73.8107 47.0419 74.5152 47.0419H109.7C111.317 47.0419 112.3 48.8245 111.436 50.1918L99.7597 68.6753C99.3835 69.2709 98.7282 69.632 98.0238 69.632H62.839C61.2219 69.632 60.2394 67.8493 61.1031 66.4821L72.7793 47.9986Z" fill="#A79AF1" />
                <path d="M54.7319 38.7627C54.7319 45.9623 46.7451 53.4604 44.0631 55.7762C43.8133 55.964 43.5091 56.0656 43.1965 56.0656C42.8839 56.0656 42.5798 55.964 42.3299 55.7762C39.6479 53.4604 31.6611 45.9623 31.6611 38.7627C31.6611 35.7033 32.8765 32.7692 35.0398 30.6059C37.2031 28.4425 40.1371 27.2272 43.1965 27.2272C46.2559 27.2272 49.19 28.4425 51.3533 30.6059C53.5166 32.7692 54.7319 35.7033 54.7319 38.7627Z" fill="#EFF2FA" stroke="#40319D" stroke-width="2.4905" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>

          </Link>

          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 font-normal text-sm md:text-base leading-5 tracking-tight"
            >

              <li className="before:block flex sm:gap-4 md:gap-6 sm:before:bg-gray-100 sm:before:w-[1px]">
                <Link
                  className="flex items-center gap-2 bg-black hover:bg-red-500 focus:bg-cyan-500 sm:px-6 sm:py-3 p-1 rounded-full text-white transition-colors duration-200"
                  href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only sm:not-sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}