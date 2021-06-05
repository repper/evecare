import * as React from 'react';
import Svg, {Defs, Path, G, Use, Mask} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function AnalysisSvgIcon(props) {
  return (
    <Svg
      width={30}
      height={32}
      viewBox="0 0 30 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Defs>
        <Path
          d="M12.136.802c6.665 0 12.069 5.388 12.069 12.035 0 6.646-5.404 12.034-12.07 12.034C5.47 24.87.068 19.483.068 12.837.067 6.19 5.47.802 12.136.802zm0 1.337C6.21 2.14 1.408 6.93 1.408 12.837c0 5.907 4.803 10.697 10.728 10.697s10.728-4.79 10.728-10.697c0-5.908-4.803-10.698-10.728-10.698z"
          id="prefix__a"
        />
        <Path
          d="M14.49 1.808c7.372 0 13.35 5.978 13.35 13.353s-5.978 13.353-13.35 13.353c-7.373 0-13.35-5.978-13.35-13.353 0-.65.046-1.29.136-1.915l2.636.43c-.068.485-.102.981-.102 1.485 0 5.9 4.781 10.682 10.68 10.682 5.898 0 10.68-4.782 10.68-10.682S20.387 4.478 14.49 4.478v-2.67z"
          id="prefix__b"
        />
        <Path
          d="M8.6.667c8.04 0 14.558 6.563 14.558 14.658 0 8.096-6.518 14.66-14.559 14.66-3.195 0-6.15-1.037-8.55-2.794l.013-.02v-.652l.5-.056 1.79-2.53a10.49 10.49 0 005.96 2.05l.287.003c5.848 0 10.588-4.773 10.588-10.66 0-5.888-4.74-10.661-10.588-10.661V.667z"
          id="prefix__c"
        />
        <Path
          d="M8.6 0c8.04 0 14.558 6.563 14.558 14.66 0 8.095-6.518 14.658-14.559 14.658-3.195 0-6.15-1.037-8.55-2.794l2.303-3.257a10.493 10.493 0 006.247 2.053c5.848 0 10.588-4.773 10.588-10.66 0-5.889-4.74-10.662-10.588-10.662V0z"
          id="prefix__d"
        />
        <Path
          d="M.005.73c8.976 0 16.253 7.121 16.253 15.906H10.84C10.84 10.78 5.99 6.032.005 6.032V.729z"
          id="prefix__f"
        />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G transform="translate(1.54 3.992)">
          <Use fill="#35809C" xlinkHref="#prefix__a" />
          <Use fillOpacity={0.2} fill="#000" xlinkHref="#prefix__a" />
        </G>
        <Path
          d="M13.676 4.126c6.666 0 12.07 5.388 12.07 12.034 0 6.646-5.404 12.034-12.07 12.034-6.665 0-12.069-5.388-12.069-12.034 0-6.646 5.404-12.034 12.07-12.034zm0 1.337c-5.925 0-10.728 4.79-10.728 10.697 0 5.908 4.803 10.697 10.728 10.697s10.728-4.79 10.728-10.697c0-5.908-4.803-10.697-10.728-10.697z"
          fill="#35809C"
        />
        <G transform="translate(-1 1.452)">
          <Use fill="#35809C" xlinkHref="#prefix__b" />
          <Use fillOpacity={0.2} fill="#000" xlinkHref="#prefix__b" />
        </G>
        <Path
          d="M26.792 14.781c.642 7.345-4.792 13.82-12.139 14.463C7.306 29.887.83 24.454.187 17.109-.455 9.764 4.98 3.289 12.326 2.646a13.469 13.469 0 011.92-.031l-.2 2.663c-.489-.025-.985-.016-1.487.028C6.68 5.82 2.334 11 2.848 16.876c.514 5.876 5.695 10.222 11.572 9.708 5.878-.514 10.225-5.694 9.711-11.57l2.66-.233z"
          fill="#35809C"
        />
        <G transform="translate(5.17 1.452)">
          <Use fill="#FB0" xlinkHref="#prefix__c" />
          <Use fillOpacity={0.15} fill="#000" xlinkHref="#prefix__c" />
          <Mask id="prefix__e" fill="#fff">
            <Use xlinkHref="#prefix__d" />
          </Mask>
          <Use fill="#FB0" xlinkHref="#prefix__d" />
          <Path
            d="M8.6-1.332c8.77 0 15.881 7.16 15.881 15.991h-5.294C19.187 8.771 14.447 4 8.6 4v-5.331z"
            fill="#D8A537"
            mask="url(#prefix__e)"
          />
        </G>
        <G>
          <G transform="translate(13.516)">
            <Use fill="#FF2E56" xlinkHref="#prefix__f" />
            <Use fillOpacity={0.2} fill="#000" xlinkHref="#prefix__f" />
          </G>
          <Path
            d="M13.522.066c8.976 0 16.252 7.122 16.252 15.908h-5.417c0-5.857-4.851-10.605-10.835-10.605V.066z"
            fill="#FF2E56"
          />
        </G>
      </G>
    </Svg>
  );
}

export default AnalysisSvgIcon;