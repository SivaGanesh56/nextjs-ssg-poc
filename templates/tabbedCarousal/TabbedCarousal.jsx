import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import RichText from '../../components/RichText';



const TabbedCarousal = ({ tabItem }) => {
  const tabs = tabItem.map(tab => tab.tabName);
  return (
    <div className="flex flex-col items-center mb-32 md:mb-32 mt-6 md:mt-10 w-full px-16 md:px-10 ">
      <Tabs defaultValue={tabs[0]} className="w-[400px]">
        <TabsList>
          {tabs.map(tab => <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>)}
        </TabsList>
        {
          tabItem.map(tab => <TabsContent key={tab.tabName} value={tab.tabName}>
            <div className="flex flex-row h-500 py-20">
              <div className="flex flex-col w-40 flex-grow-0 flex-shrink-0 gap-4 pl-36 justify-center">
                <h2 className="font-bold text-3xl leading-7 max-w-[350px]">
                  {tab.title}
                </h2>
                <div className="text-base leading-6 text-darkGrey w-[100%] max-w-[100px] text-red-700">
                  <RichText richText={tab.descriptionText} />
                </div>
              </div>

            </div>

          </TabsContent>)
        }
      </Tabs>
    </div>

  )
}

export default TabbedCarousal;