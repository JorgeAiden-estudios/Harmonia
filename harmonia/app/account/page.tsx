import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";

const Account = () => {
    return ( 
        <div className="
        bg-gradient-to-b from-[#94F4F1] to-[#00EEE5] 
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Configuración de la cuenta
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
     );
}
 
export default Account;