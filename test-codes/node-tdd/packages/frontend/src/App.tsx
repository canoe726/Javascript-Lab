import React from "react";
import { Button } from "@app/base_ui/src/components/Button";
import "./styles/global.css";

const Header = () => {
  return (
    <div className="px-[2rem] h-[6.4rem] flex justify-between items-center bg-slate-300">
      <div className="text-[2.4rem]">Logo</div>

      <div className="">
        <p>Interface</p>

        <Button
          primary={true}
          label='Button'
        ></Button>
      </div>
    </div>
  );
};

// interface IProduct {
//   price: number;
//   name: string;
//   categoryId: number;
// }

// interface IApp {
//   /** 이름 */
//   name: string;
//   /** 아이디 */
//   id: number;
//   /** @IProduct */
//   product: IProduct;
// }

function App () {
  return (
    <>
      <Header/>

      <div className="w-full min-h-full">
        <div className="w-[50%] h-full">
          <ul className="gap-y-[1.5rem] pt-[1rem]">
            <li className="px-[2rem] py-[1rem] border-2 rounded-lg border-gray-200 mx-[2rem]">
              <div>
                <input type="text" placeholder="Props name"/>
                <input type="text" placeholder="Custom type"/>
              </div>

              <div>
                <textarea placeholder="Comment"/>
              </div>

              <div>
                <button>추가</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-[50%] h-full"></div>
      </div>
    </>
  );
}

export default App;
