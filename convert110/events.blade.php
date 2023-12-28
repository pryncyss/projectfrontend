@if(count($events) > 0)
    <h2>Events:</h2>
    <ul>
        @foreach($events as $event)
            <li>{{ $event->eventName }}</li>
            <!-- Display other event details as needed -->
        @endforeach
    </ul>
@else
    <p>No events available for this event type.</p>
@endif
