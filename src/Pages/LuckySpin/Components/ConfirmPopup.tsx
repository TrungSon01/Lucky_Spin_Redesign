// type Props = {
//   isOpen: boolean;
//   message?: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// };

// export default function ConfirmPopup({
//   isOpen,
//   message,
//   onConfirm,
//   onCancel,
// }: Props) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
//         <p className="text-gray-600 mb-4">{message || "Are you sure?"}</p>

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
