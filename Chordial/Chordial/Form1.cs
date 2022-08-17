using Windows.Devices.Enumeration;
using Windows.Devices.Midi;
using System.Threading.Tasks;

namespace Chordial {
    public partial class Form1 : Form {
        public Form1() {
            InitializeComponent();
        }

        private async void Form1_Load(object sender, EventArgs e) {
            var midiInputQueryString = MidiInPort.GetDeviceSelector();
            DeviceInformationCollection midiInputDevices = await DeviceInformation.FindAllAsync(midiInputQueryString);
            // Return if no external devices are connected
            if (midiInputDevices.Count == 0) {
                textBox1.Text = "No MIDI input devices found";
                return;
            }

            // Else, add each connected input device to the list
            foreach (DeviceInformation deviceInfo in midiInputDevices) {
                textBox1.Text += deviceInfo.Name;
            }
        }
    }
}