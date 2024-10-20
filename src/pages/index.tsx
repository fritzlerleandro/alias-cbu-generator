import { useState } from "react";
import { ArrowPathRoundedSquareIcon, SparklesIcon, CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import {Montserrat} from "next/font/google";
import { useCopyToClipboard } from "usehooks-ts";
import { generateAlias } from './../utils/index';

const montserratBold = Montserrat({weight: '600', subsets: ['latin']})
const montserratRegular = Montserrat({weight: '300', subsets: ['latin']})

export default function Home() {
  const [alias, setAlias] = useState<string | null>(null)
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

  const fetchNewAlias = async () => {
    // const res = await fetch('/api/generate-alias-cbu')
    // const {alias} = await res.json()
    const alias = generateAlias({ minLength: 6, maxLength: 20, separator: '.', numWords: 3 })
    setAlias(alias)
  }

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1000);
      })
      .catch(error => {
        console.error('Failed to copy!', error)
        setCopied(false)
      })
  }
  
  return (
    <div
      style={{'background': 'radial-gradient(circle at 30% 70%, #cff428, #5fc32e, #2a9421)'}}  
      className={`${montserratRegular.className} relative grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className={`${montserratBold.className} text-4xl tracking-tight text-gray-900 sm:text-6xl animate-bounceFromLeft`}>
          {`Creá tu Alias Cbu con variantes de 'Por'`}
        </h1>
        
        <div className={`${montserratRegular.className} flex gap-4 items-center flex-col`}>
          <div className={`h-[152px]`}>
            <iframe style={{borderRadius:'12px'}} src="https://open.spotify.com/embed/track/79vy4Ma2UIfzXxJx0SXLGL?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>
          
            <button
              type="button"
              onClick={fetchNewAlias}
              className="inline-flex items-center gap-x-2 rounded-md bg-neutral-800 px-7 py-5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
            >
              {alias ? 'REGENERAR' : 'GENERAR ALIAS CBU'}
              {alias ? (<ArrowPathRoundedSquareIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />) : (<SparklesIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />)}
            </button>
            {
              alias ? (
                <>
                  <button 
                    className={`${montserratBold.className} inline-flex bg-white shadow rounded-lg text-black items-center gap-x-2 px-7 py-5`} 
                    type="button" 
                    onMouseLeave={() => setCopied(false)}
                    onClick={
                        handleCopy(alias)
                    }>
                    {alias}
                    {copied ? (<CheckIcon className="h-4 w-4"/>) : (<DocumentDuplicateIcon className="h-4 w-4"/>)}
                  </button>
                  {/* <p className="text-black">{copied ? 'Copiado!' : ""}</p> */}
                </>
              ) : null
            }
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/** Add more information here */}
      </footer>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
      <img 
        src='/spinetta-camiseta-argentina.png' 
        alt='Spinetta con camiseta argentina, una pelota y una guitarra'
        width={'400'}
        height={'400'}
        className="animate-bounceFromBottom"
      />
      </div>
    </div>
  );
}
