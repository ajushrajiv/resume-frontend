import { CiText } from "react-icons/ci";
import { MdCompare } from "react-icons/md";
import { AiOutlinePercentage } from "react-icons/ai";
import { PiHighlighterDuotone } from "react-icons/pi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { LuTextSelect } from "react-icons/lu";
import { VscPreview } from "react-icons/vsc";

function BentoGrid() {
  return (
  <div className="grid h-screen p-5 rounded-lg gap-5 grid-cols-5 grid-rows-4">
      <div className="bg-blue-100 text-blue-900 font-glegoo rounded-lg col-span-3 row-span-2 flex justify-around">
        <div className="flex flex-col space-y-5 float-left justify-center items-center mt-8 mb-8 p-4 rounded-lg">
          <div className="border rounded-lg shadow-lg py-1 px-4 flex flex-col items-center justify-center">
            <CiText className="text-pink-700 text-4xl " />
            <div className="text-sm">
                Text
            </div>
          </div>
          <div className="border rounded-lg shadow-lg p-1 flex flex-col items-center justify-center">
             <MdCompare className="text-yellow-600 text-4xl " />
             <div className="text-sm">
                Compare
            </div>
          </div>
          <div className="border rounded-lg shadow-lg py-1 px-4 flex flex-col items-center justify-center">
            <AiOutlinePercentage className="text-blue-600 text-4xl " />
            <div className="text-sm">
                Match
            </div>
          </div>
          <div className=" border rounded-lg shadow-lg p-1 flex flex-col items-center justify-center">
            <PiHighlighterDuotone className="text-green-400 text-4xl " />
            <div className="text-sm">
                Highlight
            </div>
          </div>

        </div>
        <div className="flex justify-center my-16">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                <h6 className="text-3xl pb-2 font-bold">
                    Compare
                </h6>
                <p className="inline-flex text-lg font-light items-center ">
                    Get match percentage, identify matching and non-matching keywords to refine your resume.
                </p>
                <div className='p-12 text-3xl float-right -translate-y-8 text-custom-blue'>
                    <a href='/compare-job-resume'>
                        <IoIosArrowDroprightCircle />
                    </a>
                </div>
            </div>
        </div>
      </div>

      <div className="rounded-lg col-span-2 px-6 border bg-orange-50 text-orange-800 font-glegoo row-span-2">
        <div className="text-8xl p-4 ">
          <LuTextSelect className="shadow-2xl shadow-slate-100 font-bold p-4 rounded-full text-orange-800" />
        </div>
        <div className="flex flex-col items-start mt-12 align-bottom">
          <h6 className="text-3xl pb-2 font-bold">Keywords</h6>
          <span className="inline-flex text-lg font-light items-center">Extract Essential Keywords from Job Descriptions</span>
        </div>
        <div className='p-12 text-3xl float-right -translate-y-8 text-custom-blue'>
            <a href='/keyword-generator'>
                <IoIosArrowDroprightCircle />
            </a>
        </div>
      </div>

      <div className="rounded-lg bg-bento-green col-span-2 px-8 font-glegoo row-span-2">
        <h6 className="text-white font-light text-2xl p-6">
             Track job application status by entering the company name, job title, and status.
             Edit your resume in the dashboard, then compare it with the job description to find the match percentage.        </h6>
      </div>

      <div className="border rounded-lg relative col-span-3 px-12 pt-8 bg-yellow-50 text-green-800 font-glegoo row-span-2">
        <h6 className="text-2xl">
            Track your job search progress and organize resumes
        </h6>
        <div className="text-6xl absolute right-12 bottom-12 " >
            <VscPreview />
        </div>
        <span className="flex cursor-pointer text-3xl font-bold flex-row mt-44 items-center justify-start">
            Dashboard
            <div className='text-3xl text-custom-blue pl-2'>
                <a href='/dashboard-resume'>
                <IoIosArrowDroprightCircle />
                </a>
            </div>
        </span>
      </div>
    </div>
      );
};

export default BentoGrid;