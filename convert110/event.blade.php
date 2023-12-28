<h2>Events</h2>
<ul>
    @foreach($events as $event)
        <li>{{ $event->eventName }} - {{ $event->date }} at {{ $event->time }} - {{ $event->location }}</li>
    @endforeach
</ul>
