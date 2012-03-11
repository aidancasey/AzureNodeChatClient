<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="AidansChattyRoom4" generation="1" functional="0" release="0" Id="2b2ab62a-ffeb-4a5c-aead-3eb7f0962038" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="AidansChattyRoom4Group" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="WebRole1:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/LB:WebRole1:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="WebRole1Instances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/MapWebRole1Instances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:WebRole1:Endpoint1">
          <toPorts>
            <inPortMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/WebRole1/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapWebRole1Instances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/WebRole1Instances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="WebRole1" generation="1" functional="0" release="0" software="C:\node\AzureNodeChatClient\sourcecode\ChatRoom\local_package.csx\roles\WebRole1" entryPoint="base\x86\WaHostBootstrapper.exe" parameters="base\x86\WaIISHost.exe " memIndex="768" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;WebRole1&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;WebRole1&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/WebRole1Instances" />
            <sCSPolicyFaultDomainMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/WebRole1FaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyFaultDomain name="WebRole1FaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="WebRole1Instances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="a3a44f05-88b8-46bd-b960-2c4599b66336" ref="Microsoft.RedDog.Contract\ServiceContract\AidansChattyRoom4Contract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="b6f5c71c-7ca5-4de5-bd64-371aa787f5d6" ref="Microsoft.RedDog.Contract\Interface\WebRole1:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/AidansChattyRoom4/AidansChattyRoom4Group/WebRole1:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>