import { LoginForm } from "./LoginForm";
import Rectangle148 from "../assets/Rectangle148.png";
import SecondOverlay from "../assets/secondoverlay.png";
import CloudLayer from "../assets/clouds.png";
import HeadlightLayer from "../assets/torch.png";
import DeliveryManLayer from "../assets/deliveryman.png";

export const Login = () => {
  const Group48Logo = "/logo.png"; // Using existing logo from public folder
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <section className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F9FB] px-5 py-16 sm:px-8 lg:min-h-0 lg:w-[47%] lg:px-10">
        <img
          src={Group48Logo}
          alt="Nimcure logo"
          className="absolute left-1/2 top-8 h-[44px] w-[44px] -translate-x-1/2 sm:h-[50px] sm:w-[50px]"
        />
        <div className="w-full max-w-[340px]">
          <LoginForm />
        </div>
        <div className="absolute bottom-8 flex items-center justify-center gap-2 px-4 text-[12px] font-medium text-[#7A808C]">
          <span>Powered by</span>
          <img
            src="/image 2.png"
            alt="Co-Creation Hub"
            className="h-[18px] w-auto"
          />
        </div>
      </section>
      <section className="relative hidden flex-1 bg-[#005DCC] lg:block">
        <img
          src={Rectangle148}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={SecondOverlay}
          alt=""
          className="absolute bottom-0 -left-[7.8%] w-[107.5%] h-[80%] max-w-none z-10"
        />
        <img
          src={CloudLayer}
          alt=""
          className="absolute left-1/2 top-[6%] w-[70%] -translate-x-1/2"
        />
        <img
          src={HeadlightLayer}
          alt=""
          className="absolute left-[63.3%] top-[34%] z-20 w-[22%]"
        />
        <img
          src={DeliveryManLayer}
          alt="Delivery rider"
          className="absolute left-[20%] top-[33%] z-30 w-[50%] h-[42%]"
        />
        {/* ==TEXT AREA === */}
        <div className="absolute bottom-[4%] w-full flex flex-col items-center z-40 px-12">
          <div className="flex max-w-[440px] flex-col items-start text-left">
            <h1 className="mb-2 text-[24px] font-semibold tracking-tight text-white">
              Serving Patients During a Pandemic
            </h1>
            <p className="text-white/80 text-[14px] font-medium leading-[22px]">
              Delivering essential medication to NIMR patients with adherence to
              quality of service, care and confidentiality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
