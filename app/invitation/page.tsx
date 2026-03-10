'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import InvitationHeader from '@/components/InvitationHeader';
import GuestWishForm from '@/components/GuestWishForm';
import WishesList from '@/components/WishesList';
import BackgroundMusic from '@/components/BackgroundMusic';
import FloatingHearts from '@/components/FloatingHearts';
import { motion } from 'framer-motion';

export default function InvitationPage() {
  const [refreshWishes, setRefreshWishes] = useState(0);
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'groom';
  const guestName = searchParams.get('guest') || 'default-guest';
  
  // Different info for bride's side (mode=bride) and groom's side (mode=groom)
  const isGroomSide = mode === 'groom';
  const invitationId = mode;
  
  const invitationData = isGroomSide ? {
    // NHÀ TRAI - Groom's Side
    brideName: 'Huyền Trân',
    groomName: 'Văn Đại',
    fullBrideName: 'Lucia BÙI THỊ HUYỀN TRÂN',
    fullGroomName: 'Phanxico Xavie NGUYỄN VĂN ĐẠI',
    groomParents: 'Ông Phanxico Xavie NGUYỄN VĂN CÔNG & Bà Anna NGUYỄN THỊ XUÂN HƯỞNG',
    brideParents: 'Ông Phero BÙI VĂN TIẾN & Bà Lucia VŨ THỊ BÍCH HUYỀN',
    eventType: 'LỄ TÂN HÔN',
    date: 'Chủ Nhật, 13 tháng 12, 2026',
    lunarDate: '05/11/2026',
    venue: 'Tư Gia',
    ceremonyTime: '9:00',
    guestArrival: '10:00',
    partyTime: '11:00',
    address: 'Đường Số 37, Ấp Tân Bắc, Xã Bình Minh, Huyện Trảng Bom, Đồng Nai',
    invitationId,
  } : {
    // NHÀ GÁI - Bride's Side
    brideName: 'Huyền Trân',
    groomName: 'Văn Đại',
    fullBrideName: 'Lucia BÙI THỊ HUYỀN TRÂN',
    fullGroomName: 'Phanxico Xavie NGUYỄN VĂN ĐẠI',
    groomParents: 'Ông Phanxico Xavie NGUYỄN VĂN CÔNG & Bà Anna NGUYỄN THỊ XUÂN HƯỞNG',
    brideParents: 'Ông Phero BÙI VĂN TIẾN & Bà Lucia VŨ THỊ BÍCH HUYỀN',
    eventType: 'LỄ VU QUY',
    date: 'Thứ Bảy, 12 tháng 12, 2026',
    lunarDate: '04/11/2026',
    venue: 'Nhà hàng tiệc cưới ĐỒNG XANH',
    church: 'Giáo xứ LAM SƠN',
    ceremonyTime: '15:00',
    guestArrival: '18:00',
    partyTime: '19:00',
    address: 'Sảnh Rose - 1320 Lê Đức Thọ, phường An Hội Đông, TP. Hồ Chí Minh',
    invitationId,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <FloatingHearts count={15} />
      <BackgroundMusic />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <InvitationHeader
          brideName={invitationData.brideName}
          groomName={invitationData.groomName}
          date={invitationData.date}
          venue={invitationData.venue}
          eventType={invitationData.eventType}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-serif text-pink-600 mb-6 text-center">
              {invitationData.eventType}
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-gray-700 text-lg mb-4">
                Trân trọng kính mời quý khách tham dự
              </p>
              <div className="bg-pink-50 rounded-xl p-6 mb-6">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {invitationData.fullGroomName}
                </p>
                <p className="text-sm text-gray-600 mb-1">Con trai của</p>
                <p className="text-gray-700 mb-4">{invitationData.groomParents}</p>
                
                <p className="text-2xl text-pink-500 my-4">❤️</p>
                
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {invitationData.fullBrideName}
                </p>
                <p className="text-sm text-gray-600 mb-1">Con gái của</p>
                <p className="text-gray-700">{invitationData.brideParents}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">📅 Thời gian</h3>
                <p className="text-gray-700 mb-2"><strong>Dương lịch:</strong> {invitationData.date}</p>
                <p className="text-gray-700 mb-2"><strong>Âm lịch:</strong> {invitationData.lunarDate}</p>
                {invitationData.ceremonyTime && (
                  <p className="text-gray-700 mb-2"><strong>Lễ cưới:</strong> {invitationData.ceremonyTime}</p>
                )}
                <p className="text-gray-700 mb-2"><strong>Đón khách:</strong> {invitationData.guestArrival}</p>
                <p className="text-gray-700"><strong>Khai tiệc:</strong> {invitationData.partyTime}</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">📍 Địa điểm</h3>
                <p className="text-gray-700 mb-2"><strong>Tổ chức tại:</strong> {invitationData.venue}</p>
                {invitationData.church && (
                  <p className="text-gray-700 mb-2"><strong>Thánh lễ tại:</strong> {invitationData.church}</p>
                )}
                <p className="text-gray-700"><strong>Địa chỉ:</strong> {invitationData.address}</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 italic">
                Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
              </p>
              <p className="text-gray-700 mt-2">
                📞 Liên hệ: <a href="tel:0938681296" className="text-pink-600 hover:text-pink-700">0938 681 296</a>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-16"
        >
          <GuestWishForm
            guestName={guestName}
            onSubmitSuccess={() => setRefreshWishes(prev => prev + 1)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <WishesList invitationId={guestName} refresh={refreshWishes} />
        </motion.div>
      </div>
    </div>
  );
}
