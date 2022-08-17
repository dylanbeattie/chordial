using Windows.Devices.Enumeration;
using Windows.Devices.Midi;
using System.Threading.Tasks;
using Windows.UI.Core;

namespace Chordial; 

public partial class Form1 : Form {
    public DeviceInformationCollection devices { get; set; }

    public Form1() {
        InitializeComponent();
    }

    private async void Form1_Load(object sender, EventArgs e) {
        var midiInputQueryString = MidiInPort.GetDeviceSelector();
        devices = await DeviceInformation.FindAllAsync(midiInputQueryString);
        foreach (var device in devices) listBox1.Items.Add(device.Name);
    }

    private async void listBox1_SelectedIndexChanged(object sender, EventArgs e) {
        var device = devices[listBox1.SelectedIndex];
        var port = await MidiInPort.FromIdAsync(device.Id);
        port.MessageReceived += Port_MessageReceived;
    }

    private List<byte> notes = new();

    private void NoteOn(byte note) {
        notes.Add(note);
    }

    private void NoteOff(byte note) {
        notes.RemoveAll(b => b == note);
    }

    // private List
    private void Port_MessageReceived(MidiInPort sender, MidiMessageReceivedEventArgs args) {
        switch(args.Message) {
            case MidiNoteOnMessage note: NoteOn(note.Note); break;
            case MidiNoteOffMessage note: NoteOff(note.Note); break;
        }

        label1.Invoke(() => label1.Text = GetChord());
    }

    private string GetChord() => String.Join(", ", notes.Select(n => n.ToString()).ToArray());
}