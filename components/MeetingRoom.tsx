import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import AIQuery from './AIQuery';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = ({ type }: { type?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const [showQuestions, setShowQuestions] = useState(true);

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const isCalling = useCallCallingState();

  if (isCalling !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />
      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }



  return (
    <div className='flex gap-2 h-screen overflow-hidden'>
      {showQuestions && (
        <div className="flex flex-col h-full w-full gap-4 max-w-xs md:max-w-sm bg-gray-800 text-white p-5 rounded-2xl m-5 max-sm:hidden">
          <div className='font-bold text-xl'>{(type as string).toUpperCase()}&nbsp;Interview</div>
          <AIQuery />
          <div
            onClick={() => {}}
            className='flex items-center justify-center cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2 transition-all'
          >
            Get Another Question
          </div>
        </div>
      )}

      <section className='relative flex-1 h-full overflow-hidden pt-4 text-white'>
        <div className='relative flex justify-center h-full'>
          <div className='flex max-w-[1000px] w-full items-center mx-5'>
            <CallLayout />
          </div>
          {showParticipants && (
            <div className='h-full w-64 ml-2 bg-gray-900 p-4 rounded-2xl'>
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          )}
        </div>

        <div className='left-0 fixed bottom-0 w-full flex items-center justify-center gap-5 bg-gray-900 bg-opacity-50 backdrop-blur-md flex-wrap'>

              {type && (
                <button onClick={() => setShowQuestions((prev) => !prev)}>
                  <div className='cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2 transition-all'>
                    <div className='text-white'>
                      {!showQuestions ? ('View Recommended Questions') : ('Hide Recommended Questions')}
                    </div>
                  </div>
                </button>
              )}
          <DropdownMenu>
            <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2 transition-all'>
                <LayoutList size={20} className='text-white' />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => {
                      setLayout(item.toLowerCase().replace('-', '') as CallLayoutType);
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                </div>
              ))}
              <DropdownMenuSeparator className='border-dark-1' />
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />

          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2 transition-all'>
              <Users size={20} className='text-white' />
            </div>
          </button>


          <CallControls onLeave={() => router.push('/')} />

          {!isPersonalRoom && <EndCallButton />}
        </div>
      </section>
    </div>
  );
}

export default MeetingRoom;
